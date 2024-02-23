const { ethers, Contract } = require("ethers");

// Khởi tạo provider cho mạng Polygon
const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");

// Khởi tạo một đối tượng Wallet từ private key của ví
const privateKey = "";
const signer = new ethers.Wallet(privateKey, provider);

// Địa chỉ ví nhận tiền
const toAddress = "";

const tokenContract = "";

// Số lượng token muốn gửi
const amountToSend = ethers.parseUnits("0.12345", 18); // 100 token với 18 decimals

(async () => {
  try {
    // Kiểm tra số dư của ví gửi token
    const abi = [
      "function decimals() view returns (string)",
      "function symbol() view returns (string)",
      "function balanceOf(address addr) view returns (uint)",
      "function transfer(address to, uint amount)",
    ];

    // Create a contract
    const contract = new Contract(tokenContract, abi, provider);
    const balance = await contract.balanceOf(signer.address);
    console.log(
      "Token balance before sending:",
      ethers.formatUnits(balance, 18)
    );

    //Define the data parameter
    const data = contract.interface.encodeFunctionData("transfer", [
      toAddress,
      amountToSend,
    ]);

    // Creating and sending the transaction object

    const tx = await signer.sendTransaction({
      to: tokenContract,
      from: signer.address,
      value: amountToSend,
      data: data,
    });

    console.log("Mining transaction...");
    console.log(`tx: ${tx.hash}`);

    // Waiting for the transaction to be mined
    const receipt = await tx.wait();

    // Kiểm tra số dư sau khi gửi
    const newBalance = await contract.balanceOf(signer.address);
    console.log(
      "Token balance after sending:",
      ethers.formatUnits(newBalance, 18)
    );
  } catch (error) {
    console.error("Error:", error);
  }
})();
