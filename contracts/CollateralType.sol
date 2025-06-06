// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

library CollateralType {
    enum Class { NONE, POOL, VAULT }

    struct Data {
        CollateralType.Class collateralClass;
        IERC20 token;
        uint256 decimals;
        uint256 validUntil;
        bool directPricePair;
        string assetFtsoSymbol;
        string tokenFtsoSymbol;
        uint256 minCollateralRatioBIPS;
        uint256 ccbMinCollateralRatioBIPS;
        uint256 safetyMinCollateralRatioBIPS;
    }
}
