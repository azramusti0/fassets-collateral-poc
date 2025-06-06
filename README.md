# fassets-collateral-poc

This repository demonstrates critical vulnerabilities found in the `CollateralType.Data` structure within the Flare Foundation's fAssets protocol.

> This proof-of-concept (PoC) validates exploitable flaws related to collateral acceptance, price manipulation, and validation bypass.

---

## ⚠️ Summary of Vulnerabilities

| Type                           | Description                                                                 |
|--------------------------------|-----------------------------------------------------------------------------|
| 🟠 Low `minCollateralRatioBIPS` | Allows agents to register with dangerously low collateralization thresholds |
| 🟠 Decimal Mismatch             | Exploits incorrect or missing `decimals` field in tokens                    |
| 🟠 Expired Collateral Acceptance| `validUntil` value is not enforced properly                                 |
| 🟠 FTSO Symbol Manipulation     | Incorrect or empty FTSO symbols allow reward and pricing distortion         |

---

## 🔬 Vulnerable Components

| Contract File | Key Structure |
|---------------|---------------|
| `CollateralType.sol` | `CollateralType.Data` |
| Used in: | `CollateralTypesFacet.sol`, `AssetManagerController.sol`, `SettingsManagementFacet.sol`, etc. |

All PoC tests target the design flaws inside this shared structure which is consumed across facets and libraries.

---

## 🧪 Test Scenarios

Each exploit is individually verified in the `test/CollateralType.test.js` file.

```bash
npx hardhat test
Expected Output:

  CollateralType PoC - Detailed Exploit Scenarios
    ✔ should simulate low minCollateralRatioBIPS acceptance
    ✔ should allow invalid token decimals to manipulate price
    ✔ should accept expired token due to validUntil misuse
    ✔ should accept invalid FTSO symbols causing manipulation

git clone https://github.com/azramusti0/fassets-collateral-poc.git
cd fassets-collateral-poc
npm install
npx hardhat test
