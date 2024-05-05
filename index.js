const { BigNumber, ethers } = require("ethers");
const bn = require("bignumber.js");
const abi = require("./UniswapV3Pool.json").abi;

// Configure bignumber.js
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

// Function to encode price from sqrt price
function encodePriceSqrt(reserve1, reserve0) {
  return BigNumber.from(
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  );
}

// Function to call slot0 using ethers
async function getSlot0(contractAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/_D9da0TdYBvLA6GQzPkjqjdeM91rj66M"
  );

  const contract = new ethers.Contract(contractAddress, abi, provider);
  try {
    const slot0Result = await contract.slot0();
    return slot0Result;
  } catch (error) {
    console.error("Error calling slot0:", error);
    throw error;
  }
}
async function getDecimals(contractAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/_D9da0TdYBvLA6GQzPkjqjdeM91rj66M"
  );

  const contract = new ethers.Contract(contractAddress, abi, provider);
  try {
    const slot0Result = await contract.pair();
    return slot0Result;
  } catch (error) {
    console.error("Error calling slot0:", error);
    throw error;
  }
}

// Function to calculate price from sqrt price
function calculatePricefromSqrtPriceX96ForUSD(sqrtPriceX96) {
  const sqrtPrice = sqrtPriceX96 / 2 ** 96;
  const price = sqrtPrice ** 2;
  const decimal = price / 10 ** 12; // because 10^18 / 10^6 = 10^12 (10^6 because of USDC)
  const ethPriceYbyX = parseFloat(decimal);
  const usdInEthXbyY = 10 ** 12 / price;

  return {
    sqrtPrice: sqrtPrice,
    price: price,
    ethPriceYbyX: ethPriceYbyX,
    usdInEthXbyY: usdInEthXbyY,
  };
}

function calculatePricefromSqrtPriceX96(sqrtPriceX96) {
  const sqrtPrice = sqrtPriceX96 / 2 ** 96;
  const price = sqrtPrice ** 2;
  const ethPrice = price.toFixed(10);
  const usdInEth = 1 / price;

  return {
    sqrtPrice: sqrtPrice,
    price: price,
    ethPriceinUSD: ethPrice,
    usdInEth: usdInEth,
  };
}

async function main() {
  try {
    const slot0Result = await getSlot0(
      "0x381fE4Eb128db1621647cA00965da3F9e09F4fAc"
    );
    // console.log("Slot0 Result:", slot0Result);
    // const sqrtPrice = 1422288862934490882466257948084879;
    const sqrtPriceX96 = BigNumber.from(
      slot0Result.sqrtPriceX96.toHexString()
    ).toString();

    console.log("sqrtPriceX96: ", sqrtPriceX96);
    const priceCalculationResult = calculatePricefromSqrtPriceX96(sqrtPriceX96);
    console.log("Price Calculation Result:", priceCalculationResult);
    // console.log(await getDecimals(0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640));
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
