√p is a fixed point Q64.96 number( 64 bits for integer part, 96 bits for fractional part)

# Ticks range:

[−887272,887272]

# we can get price from 2 places

- sqrtPriceX96 (preferred way)
- tick

Why 2 \*\* 96 (for gas efficiency)

### calculating price from sqrtPriceX96

√p = √y/x

sqrtPriceX96 = sqrtPrice / 2 \*\* 96

sqrtPrice = sqrtPriceX96/2^96

price = sqrtPrice^2

putting everything together:
price=(sqrtPriceX96/2^96)^2

# tick v tickSpacing

```shell
tick: ----- (Units of measurement that are used to define specific price ranges)
      ^^^^^
   5 ticks here
```

```shell
tickspacing: === === === (The distance between two ticks, as defined by the fee tier)
              ^   ^   ^
            3 tick space here
```

# Visualization

lets assume 0.3 is 3 ticks

```shell
-887272                                             0         P                                      887272
   |------------------------------------------------:---------|---------------------------------------|
```

now lets say at this price User wants to add liquidity: 1000 & 10 as per the ratio
wants to give from \ -to-\

```shell
-887272                                              0         P                                      887272
   |---------------------------------------------\---:---------|-----------\----------------------------|
```

# Liquidity distribution visualization (add Liquidity)

1000/4 = 250
10/4 = 2.5

```shell
                       USDC                                      P                  ETH
-887272                                           250 250 250 250 2.5 2.5 2.5 2.5                          887272
   |---------------------------------------------\===.===.===.===|===.===.===.==\=---------------------------|
                                                                                 ^ have to go little further because tickSpacing of 0.3 tier
```

### OR (depends on how interface is designed) (contract will only allow you to put your range in multiple of tick-space)

1000/4 = 250
10/3 = 3.3

```shell
                       USDC                                      P                  ETH
-887272                                           250 250 250 250 3.3 3.3 3.3                             887272
   |---------------------------------------------\===.===.===.===|===.===.===\==\=---------------------------|
                                                                             ^   ^
          have to go floor because you are not fulfilling the next Tick-space   `` not allowed at here becasue not fulfilling
                                                                                   the tick-space
```

reference pool contract: https://etherscan.io/address/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640#readContract (verified)

Change of **1 tick** always represents a price change of **0.01%** from the current price.

so for pool with HIGH fees (1%) the tick spacing is **200**, so the price difference between those ticks will be **0.01 \* 200 = 2%**
more precisely can be calcukated as: 1.0001 \*\* 200 = 1.0202003198939341379680891160085

1.0202003198939341379680891160085 - 1.0001 =
diff: 0.0201003198939341379680891160085

**change in percent** = diff / 1.0001 =
2.0098310062927845183570758932607 %

Fee Tier table:

![Relationship between fees and tick-spacing](https://images.ctfassets.net/oc3ca6rftwdu/4frFW4vjWztra6jaQRqjve/241b6f514df980da1e1afc11709a82bd/table1__2_.png)

Liquidity distribution Better visualization:

![Example of tick-spacing vs ticks](https://images.ctfassets.net/oc3ca6rftwdu/1CAALWusWI2Q2Ns1CvS2Zs/2388c8df6c862e74cbb88830847a6296/figure2__1_.jpeg)

in the above image you can notice

- dotted lines shows possible initialized ticks which occur at min tick-spacing
- solid black line indicates the current tick (price)
- notice that liquidity is constant between two dashed lines (a difference of 10 ticks)
- liquidity is never midway or half way of the tick space
- different tick space or range has different liquidity available at that tick space

# What does tick represent

Ticks are related directly to price

to convert tick T -> price

take 1.0001 \*\* T
