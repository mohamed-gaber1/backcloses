const Testimonial = require("../models/testimonial.model");


// Create testimonial
const createTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.create({
            name: req.body.name,
            rating: req.body.rating,
            comment: req.body.comment
        });

        res.status(201).json({
            status: "success",
            data: testimonial
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// Get testimonials
const getTestimonials = async (req, res) => {
    try {
        let filter = {};

        // لو المستخدم مش عامل login
        if (!req.user) {
            filter.status = "approved";
        }

        // لو المستخدم عامل login
        else {
            // لو محدد status
            if (req.query.status) {
                filter.status = req.query.status;
            }
        }

        const testimonials = await Testimonial.find(
            filter,
            { __v: 0 }
        );

        res.status(200).json({
            status: "success",
            results: testimonials.length,
            data: testimonials
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

// Approve
const approveTestimonial = async (req, res) => {
    try {

        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.testimonialId,
            { status: "approved" },
            {
                new: true,
                runValidators: true
            }
        );

        if (!testimonial) {
            return res.status(404).json({
                status: "fail",
                message: "Testimonial not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: testimonial
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// Reject
const rejectTestimonial = async (req, res) => {
    try {

        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.testimonialId,
            { status: "rejected" },
            {
                new: true,
                runValidators: true
            }
        );

        if (!testimonial) {
            return res.status(404).json({
                status: "fail",
                message: "Testimonial not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: testimonial
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// Delete
const deleteTestimonial = async (req, res) => {
    try {

        const testimonial = await Testimonial.findByIdAndDelete(
            req.params.testimonialId
        );

        if (!testimonial) {
            return res.status(404).json({
                status: "fail",
                message: "Testimonial not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Testimonial deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


module.exports = {
    createTestimonial,
    getTestimonials,
    approveTestimonial,
    rejectTestimonial,
    deleteTestimonial
};