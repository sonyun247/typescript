import * as Crypto from "crypto-js";

class Block{
  public index:number;
  public hash:string;
  public previousHash:string;
  public data:string;
  public timeStamp:number;

  static calculateBlockHash = 
  (index:number,previousHash:string, data:string, timeStamp:number ):string => 
  Crypto.SHA256(index+previousHash+data+timeStamp).toString();

  static validateStructure = (aBlock:Block):boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timeStamp === "number";

  constructor(
    index:number,
    hash:string,
    previousHash:string,
    data:string,
    timeStamp:number
    ){
      this.index=index; 
      this.hash=hash;
      this.previousHash=previousHash;
      this.data=data;
      this.timeStamp=timeStamp;
    }
}

const genesisBlock:Block = new Block(0,"asdf","","genesis",123456);

let blockchain:Block[] = [genesisBlock];

const getBlockchain = ():Block[] => blockchain;

const getLatestBlock = ():Block => blockchain[blockchain.length-1];

const getNewTimeStamp = ():number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data:string):Block => {
  const previousBlock:Block = getLatestBlock();
  const newIndex: number = previousBlock.index+1;
  const newTimeStamp:number=getNewTimeStamp();
  const newHash:string=Block.calculateBlockHash(
    newIndex,previousBlock.hash,data,newTimeStamp
  );
  const newBlock:Block=new Block(
    newIndex,newHash,previousBlock.hash,data,newTimeStamp
  );
  addBlock(newBlock);
  return newBlock;
}

const getHashforBlock = (aBlock:Block):string => 
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.data,
    aBlock.timeStamp
  );

const isBlockValid = (candidateBlock:Block, previousBlock:Block):boolean =>{
  if(!Block.validateStructure(candidateBlock)){
    return false;
  }else if (previousBlock.index+1 !== candidateBlock.index){
    return false;
  }else if (previousBlock.hash !== candidateBlock.previousHash){
    return false;
  }else if (getHashforBlock(candidateBlock)!==candidateBlock.hash){
    return false;
  }else {
    return true;
  }
};

const addBlock = (candidateBlock:Block):void => {
  if(isBlockValid(candidateBlock,getLatestBlock())){
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second");
createNewBlock("third");
createNewBlock("fourth");

console.log(blockchain);

export {};