const Branch = require("../models/branch.model");

const createBranch = async (req, res) => {
    try {
        const branch = await Branch.create(req.body);

        res.status(201).json({
            status: "success",
            data: branch
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


const getBranches = async (req, res) => {
    try {
        const branches = await Branch.find({}, { __v: 0 });

        res.status(200).json({
            status: "success",
            results: branches.length,
            data: branches
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


const updateBranch = async (req, res) => {
    try {
        const branch = await Branch.findByIdAndUpdate(
            req.params.branchId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!branch) {
            return res.status(404).json({
                status: "fail",
                message: "Branch not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: branch
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


const deleteBranch = async (req, res) => {
    try {
        const branch = await Branch.findByIdAndDelete(
            req.params.branchId
        );

        if (!branch) {
            return res.status(404).json({
                status: "fail",
                message: "Branch not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Branch deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


module.exports = {
    createBranch,
    getBranches,
    updateBranch,
    deleteBranch
};