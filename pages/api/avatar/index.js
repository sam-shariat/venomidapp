import { CONTRACT_ADDRESS, CONTRACT_ADDRESS_V1, CONTRACT_ADDRESS_V2 } from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { CollectionContract } = require('abi/CollectionContract');
const { NftContract } = require('abi/NftContract');
import fs from 'fs';
import path from 'path';
import axios from 'axios';

let client = null;

async function getClient() {
  if (!client) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    TonClient.useBinaryLibrary(libNode);
    client = new TonClient({
      network: {
        endpoints: ['https://gql-testnet.venom.foundation/graphql'],
      },
    });
  }
  return client;
}

export default async function handler(req, res) {
  try {
    console.log(req.query);
    if (!req.query.name) {
      res.status(202).json({ status: 'error', message: 'name param is required' });
      process.exit(1);
    }

    let _name ;
    if(req.query.name.toLowerCase().includes('.vid')){
      _name = req.query.name.slice(0,-4);
    } else {
      _name = req.query.name.toLowerCase();
    }
    const name = String(_name).toLowerCase() + '.VID';

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();

    const collection = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: CONTRACT_ADDRESS,
    });

    const collectionv1 = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: CONTRACT_ADDRESS_V1,
    });

    // const collectionv2 = new Account(CollectionContract, {
    //   signer: signerKeys(keys),
    //   client,
    //   address: CONTRACT_ADDRESS_V2,
    // });

    const { rows } = await sql`SELECT * FROM vids WHERE name = ${name};`;
    //console.log(rows[0]);
    let nftAddress;
    let owner;
    if (rows.length > 0) {
      nftAddress = String(rows[0].address)
      owner = String(rows[0].owner);
    } else {
      let response = await collection.runLocal('getInfoByName', {
        name: String(_name),
      });
      if (response.decoded.output.value0.name !== 'notfound') {
        nftAddress = response.decoded.output.value0.nftAddress;
        owner = response.decoded.output.value0.owner;
      } else {
        let responsev1 = await collectionv1.runLocal('getInfoByName', {
          name: String(_name),
        });
        nftAddress = responsev1.decoded.output.value0.nftAddress;
        owner = responsev1.decoded.output.value0.owner;
      }
    }

    const nft = new Account(NftContract, {
      signer: signerKeys(keys),
      client,
      address: nftAddress,  
    });

    let responseJson = await nft.runLocal('getJson', { answerId: 0 });
    let json = JSON.parse(responseJson.decoded.output.json);

    let jsonUrl = json.attributes?.find((att) => att.trait_type === 'DATA')?.value;

    //res.status(200).json({json:json,jsonUrl:jsonUrl});

    if (jsonUrl) {
      const result = await axios.get(String('https://ipfs.io/ipfs/' + jsonUrl));
      const imageBuffer = await axios.get(String(result.data.avatar), {
        responseType: 'arraybuffer',
      });
      //console.log(result);
      //res.status(200).json({json:json,jsonUrl:jsonUrl, avatar:result.data.avatar});
      res.status(200).setHeader('Content-Type', 'image/jpg').setHeader('Cache-Control','public, immutable, no-transform, max-age=31536000').send(imageBuffer.data);
    } else {
      const defaultImage = path.resolve('.', 'public/logos/vidicon.jpg');
      const imageBuffer = fs.readFileSync(defaultImage);
      res.status(200).setHeader('Content-Type', 'image/jpg').setHeader('Cache-Control','public, immutable, no-transform, max-age=31536000').send(imageBuffer);
    }
  } catch (err) {
    const defaultImage = path.resolve('.', 'public/logos/vidicon.jpg');
    const imageBuffer = fs.readFileSync(defaultImage);
    res.status(200).setHeader('Content-Type', 'image/jpg').setHeader('Cache-Control','public, immutable, no-transform, max-age=31536000').send(imageBuffer);
  }
}
