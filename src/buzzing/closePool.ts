import { userKeypair1, program, usdb_mint, TOKEN_PROGRAM_ID, anchor, PublicKey } from './config';
import { Keypair } from '@solana/web3.js';
import { Buffer } from 'buffer';


async function closePools(creatorKeypair: Keypair, topicId: number) {
  const idBuf = Buffer.alloc(8);
  idBuf.writeBigUInt64LE(BigInt(topicId));


  const [topicPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("topic"), idBuf, creatorKeypair.publicKey.toBuffer()],
    program.programId,
  );

  const [yesPool] = await PublicKey.findProgramAddressSync(
    [Buffer.from("yes_pool"), topicPda.toBuffer()],
    program.programId,
  );

  const [noPool] = await PublicKey.findProgramAddressSync(
    [Buffer.from("no_pool"), topicPda.toBuffer()],
    program.programId,
  );

  const [yesMint] = await PublicKey.findProgramAddressSync(
    [Buffer.from("yes_mint"), topicPda.toBuffer()],
    program.programId,
  );

  const [noMint] = await PublicKey.findProgramAddressSync(
    [Buffer.from("no_mint"), topicPda.toBuffer()],
    program.programId,
  );

  const [yesPoolToken] = await PublicKey.findProgramAddressSync(
    [Buffer.from("yes_pool_token"), topicPda.toBuffer()],
    program.programId,
  );

  const [noPoolToken] = await PublicKey.findProgramAddressSync(
    [Buffer.from("no_pool_token"), topicPda.toBuffer()],
    program.programId,
  );

  const [yesPoolUsdb] = await PublicKey.findProgramAddressSync(
    [Buffer.from("yes_pool_usdb"), topicPda.toBuffer()],
    program.programId,
  );

  const [noPoolUsdb] = await PublicKey.findProgramAddressSync(
    [Buffer.from("no_pool_usdb"), topicPda.toBuffer()],
    program.programId,
  );

  const transaction = await program.methods
    .closePools(creatorKeypair.publicKey,new anchor.BN(topicId))
    .accounts({
      // creator: creatorKeypair.publicKey,
      // topic: topicPda,
      // yesPool: yesPool,
      // noPool: noPool,
      // yesMint: yesMint,
      // noMint: noMint,
      // yesPoolToken: yesPoolToken,
      // noPoolToken: noPoolToken,
      // yesPoolUsdb: yesPoolUsdb,
      // yesPoolUsdb: noPoolUsdb,
      usdbMint: usdb_mint,
      tokenProgram: TOKEN_PROGRAM_ID,
      // systemProgram: SystemProgram.programId,
    })
    .signers([creatorKeypair])
    .rpc();
  
  console.log("Pools closed with transaction:", transaction);
}


const userKeypair = userKeypair1;

closePools(userKeypair, 5).then(()=>{
    console.log("closePool success");
}).then(()=>{
    console.log("closePool success");
})