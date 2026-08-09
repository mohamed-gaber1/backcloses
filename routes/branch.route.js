const express = require("express");

const router = express.Router();

const authentication = require("../middlewares/authentication.middleware");

const branchController = require("../controllers/branch.controller");

const {
    createBranchValidation,
    updateBranchValidation
} = require("../validation/branch.validation");


router.post(
    "/",
    authentication,
    createBranchValidation,
    branchController.createBranch
);


router.get(
    "/",
    branchController.getBranches
);


router.patch(
    "/:branchId",
    authentication,
    updateBranchValidation,
    branchController.updateBranch
);


router.delete(
    "/:branchId",
    authentication,
    branchController.deleteBranch
);


module.exports = router;