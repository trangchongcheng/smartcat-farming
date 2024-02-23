const { ethers } = require("ethers");
const abi = [
  { inputs: [], name: "InvalidInitialization", type: "error" },
  { inputs: [], name: "NotInitializing", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      { indexed: false, internalType: "uint8", name: "level", type: "uint8" },
      {
        indexed: false,
        internalType: "uint256",
        name: "pointsBalance",
        type: "uint256",
      },
    ],
    name: "LevelUp",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "inviter", type: "uint256" },
    ],
    name: "acceptPlayDate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "authorisedProxyAddresses",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "canClean",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "canFeed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "canLevelUp",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "canPlay",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "catIds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "catStates",
    outputs: [
      { internalType: "uint8", name: "level", type: "uint8" },
      { internalType: "uint16", name: "numFeeds", type: "uint16" },
      { internalType: "uint256", name: "lastFeed", type: "uint256" },
      { internalType: "uint16", name: "numPlays", type: "uint16" },
      { internalType: "uint256", name: "lastPlay", type: "uint256" },
      { internalType: "uint16", name: "numCleans", type: "uint16" },
      { internalType: "uint256", name: "lastClean", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "cleanCat",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "feedCat",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "offset", type: "uint256" },
      { internalType: "uint16", name: "pageSize", type: "uint16" },
    ],
    name: "getAllCats",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint8", name: "level", type: "uint8" },
          { internalType: "uint256", name: "pointsBalance", type: "uint256" },
        ],
        internalType: "struct SmartCatProxyV3.AllCatListItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getCatInfo",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "uint8", name: "level", type: "uint8" },
              { internalType: "uint16", name: "numFeeds", type: "uint16" },
              { internalType: "uint256", name: "lastFeed", type: "uint256" },
              { internalType: "uint16", name: "numPlays", type: "uint16" },
              { internalType: "uint256", name: "lastPlay", type: "uint256" },
              { internalType: "uint16", name: "numCleans", type: "uint16" },
              { internalType: "uint256", name: "lastClean", type: "uint256" },
              { internalType: "uint256[]", name: "friends", type: "uint256[]" },
            ],
            internalType: "struct SmartCatProxyV3.CatState",
            name: "state",
            type: "tuple",
          },
          { internalType: "uint256", name: "pointsBalance", type: "uint256" },
          {
            internalType: "uint256",
            name: "actionLimitReset",
            type: "uint256",
          },
        ],
        internalType: "struct SmartCatProxyV3.CatInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getCatInfo2",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "uint8", name: "level", type: "uint8" },
              { internalType: "uint16", name: "numFeeds", type: "uint16" },
              { internalType: "uint256", name: "lastFeed", type: "uint256" },
              { internalType: "uint16", name: "numPlays", type: "uint16" },
              { internalType: "uint256", name: "lastPlay", type: "uint256" },
              { internalType: "uint16", name: "numCleans", type: "uint16" },
              { internalType: "uint256", name: "lastClean", type: "uint256" },
              { internalType: "uint256[]", name: "friends", type: "uint256[]" },
            ],
            internalType: "struct SmartCatProxyV3.CatState",
            name: "state",
            type: "tuple",
          },
          { internalType: "uint256", name: "pointsBalance", type: "uint256" },
          {
            internalType: "uint256",
            name: "actionLimitReset",
            type: "uint256",
          },
          { internalType: "uint16", name: "actionLimitCount", type: "uint16" },
        ],
        internalType: "struct SmartCatProxyV3.CatInfo2",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getCatState",
    outputs: [
      {
        components: [
          { internalType: "uint8", name: "level", type: "uint8" },
          { internalType: "uint16", name: "numFeeds", type: "uint16" },
          { internalType: "uint256", name: "lastFeed", type: "uint256" },
          { internalType: "uint16", name: "numPlays", type: "uint16" },
          { internalType: "uint256", name: "lastPlay", type: "uint256" },
          { internalType: "uint16", name: "numCleans", type: "uint16" },
          { internalType: "uint256", name: "lastClean", type: "uint256" },
          { internalType: "uint256[]", name: "friends", type: "uint256[]" },
        ],
        internalType: "struct SmartCatProxyV3.CatState",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getConfig",
    outputs: [
      { internalType: "uint256[3]", name: "", type: "uint256[3]" },
      { internalType: "uint16[3]", name: "", type: "uint16[3]" },
      { internalType: "uint8", name: "", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getConfig2",
    outputs: [
      { internalType: "uint256[3]", name: "", type: "uint256[3]" },
      { internalType: "uint16[3]", name: "", type: "uint16[3]" },
      { internalType: "uint8", name: "", type: "uint8" },
      { internalType: "uint16", name: "", type: "uint16" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getFriendsList",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "string", name: "tokenUri", type: "string" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint8", name: "level", type: "uint8" },
          { internalType: "bool", name: "canPlay", type: "bool" },
        ],
        internalType: "struct SmartCatProxyV3.CatListItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getLevel",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getPendingInvitesList",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "string", name: "tokenUri", type: "string" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint8", name: "level", type: "uint8" },
          { internalType: "bool", name: "canPlay", type: "bool" },
        ],
        internalType: "struct SmartCatProxyV3.CatListItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getPlayInviteIds",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getPlayInvitesList",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "string", name: "tokenUri", type: "string" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint8", name: "level", type: "uint8" },
          { internalType: "bool", name: "canPlay", type: "bool" },
        ],
        internalType: "struct SmartCatProxyV3.CatListItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getPointsBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_nftContractAddress", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "invitee", type: "uint256" },
    ],
    name: "inviteCatForPlaying",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "levelAwards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "levelUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "maxActionState",
    outputs: [
      {
        internalType: "uint256",
        name: "firstActionTimestamp",
        type: "uint256",
      },
      { internalType: "uint16", name: "count", type: "uint16" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxLevel",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "pendingInvites",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "playInvites",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "pointBalances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_authorisedProxyAddresses",
        type: "address[]",
      },
    ],
    name: "setAuthedProxyAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "_levelAwards", type: "uint256[]" },
    ],
    name: "setLevelAwards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "_maxActions", type: "uint16" },
      { internalType: "uint256", name: "_maxActionsInterval", type: "uint256" },
    ],
    name: "setMaxActionConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "_maxLevel", type: "uint8" }],
    name: "setMaxLevel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[3]", name: "_minIntervals", type: "uint256[3]" },
    ],
    name: "setMinIntervals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16[3]",
        name: "_minLevelUpScores",
        type: "uint16[3]",
      },
    ],
    name: "setMinLevelUpScores",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_nftContractAddress", type: "address" },
    ],
    name: "setNftContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "tokenIdArrayToTokenList",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "string", name: "tokenUri", type: "string" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint8", name: "level", type: "uint8" },
          { internalType: "bool", name: "canPlay", type: "bool" },
        ],
        internalType: "struct SmartCatProxyV3.CatListItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "upgradeV3",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Sửa lại thành thông tin của anh em
// Edit with you info
const account = {
  name: "You name", // Tên điền gì cũng được
  privateKey: "", // private key của ví anh em
  ids: [1074275123], // id của mèo anh em, anh em có thể nuôi nhiều con để được cộng dồn điểm
};

let clearOrFeed = "feed";
let countClear = 0;
let countFeed = 0;

let positionId = 0;

let isFull = false;
let isClear = false;

/* 
==================> Tác giả: x.com/trangchongcheng 
==================> Website: https://airdrop101.xyz (đang phát triển) 
==================> Nếu thấy hữu ích xin đấm cho mình 1 follow vào mặt để ae ta hiểu nhau hơn 
*/

async function main() {
  const node = "https://polygon-rpc.com"; // AE nào rành có thể lên Infura tạo riêng 1 RPC để dùng cho mượt
  const provider = new ethers.JsonRpcProvider(node);
  let privatekey = account.privateKey;
  let wallet = new ethers.Wallet(privatekey, provider);

  let contractaddress = "0x7573933eb12fa15d5557b74fdaff845b3baf0ba2";
  let contract = new ethers.Contract(contractaddress, abi, wallet);
  const currentCat = account.ids[positionId];
  if (clearOrFeed === "feed") {
    let canFeed = await contract.canFeed(currentCat);
    if (canFeed) {
      let write = await contract.feedCat(currentCat);
      ++countFeed;
      console.log(
        `Cho ăn mèo ${currentCat} của ${account.name} thành công lần ${countFeed}, tx:  `,
        write.hash
      );
    } else {
      console.log("No rồi, không ăn đc nữa");
      isFull = true;
    }
    clearOrFeed = "clear";
  } else {
    let canClean = await contract.canClean(currentCat);
    if (canClean) {
      let write = await contract.cleanCat(currentCat);
      ++countClear;
      console.log(
        `Tắm mèo ${currentCat} của ${account.name} thành công lần  ${countClear}, tx: `,
        write.hash
      );
    } else {
      console.log("Sạch rồi không tắm nữa");
      isClear = true;
    }
    clearOrFeed = "feed";
  }
  if (isClear && isFull) {
    if (positionId === account.ids.length - 1) {
      console.log(
        "----- Xong -----, Tắt máy nghỉ ngơi được rồi ",
        account.name
      );
    } else {
      console.log(
        `Xong con mèo ${currentCat} thứ ${positionId + 1} của tài khoản ${
          account.name
        }`
      );
      ++positionId;
    }
    countFeed = 0;
    countClear = 0;
    isFull = false;
    isClear = false;
  }
}

setInterval(() => {
  main();
}, 60000);
