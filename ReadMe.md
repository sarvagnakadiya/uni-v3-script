√p is a fixed point Q64.96 number( 64 bits for integer part, 96 bits for fractional part)

Ticks range:
[−887272,887272]

we can get price from 2 places

- sqrtPriceX96 (preferred way)
- tick

Why 2 \*\* 96 (for gas efficiency)

√p = √y/x
sqrtPriceX96 = sqrtPrice / 2 \*\* 96

sqrtPrice = sqrtPriceX96/2^96
price = sqrtPrice^2

putting everything together:
price=(sqrtPriceX96/2^96)^2

# Visualization

lets assume 0.3 is 3 ticks

```shell
-887272                                             0         P                                      887272
   |------------------------------------------------:---------|---------------------------------------|
```

now lets say at this price User wants to add liquidity: 1000 & 10 as per the ratio
wants to give from \ -to-\

```shell
-887272                                              0          P                                      887272
   |---------------------------------------------\---:---------|-----------\----------------------------|
```

1000/4 = 250
10/4 = 2.5

```shell
                       USDC                                      P                  ETH
-887272                                           250 250 250 250 2.5 2.5 2.5 2.5                          887272
   |---------------------------------------------\===.===.===.===|===.===.===.==\=---------------------------|
                                                                                 ^ have to go little further because tickSpacing of 0.3 tier
```
