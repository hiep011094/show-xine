import { productModel } from "../models/productModel.js";
import ErrorHander from "../utils/errorhander.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apifeatures.js";

// Get All Products
export const getAllProduct = catchAsyncError(async(req, res, next) => {
    const resultPerPage = 2;
    const productCount = await productModel.countDocuments();

    const apiFeature = new ApiFeatures(productModel.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const products = await apiFeature.query;

    res.status(201).json({
        success: true,
        products,
        productCount,
    });
});

// Get Product details
export const getDetailsProduct = catchAsyncError(async(req, res, next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product not found.", 404));
    }

    res.status(201).json({
        success: true,
        product,
        // productCount,
    });
});

// Create Product -- Admin
export const createProduct = catchAsyncError(async(req, res, next) => {
    req.body.user = req.user.id;
    const product = await productModel.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

// Update Product -- Admin
export const updateProduct = catchAsyncError(async(req, res, next) => {
    let product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product not found.", 404));
    }

    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        product,
    });
});

// Delete Product -- Admin

export const deleteProduct = catchAsyncError(async(req, res, next) => {
    const product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found.", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product delete successfully",
    });
});

// Create New Review or Update the rating review

export const createAndUpdateRatingReview = catchAsyncError(async(req, res, next) => {
    const { rating, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.fullname,
        rating: Number(rating)
    };

    const product = await productModel.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating);
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    let l = 0;

    product.reviews.forEach((rev) => {
        if (rev.rating) {
            avg += rev.rating;
            l++;
        };
    });

    product.ratings = avg / l;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});


// Get All Reviews of a product
export const getProductReviews = catchAsyncError(async(req, res, next) => {
    const product = await productModel.findById(req.query.id);

    if (!product) {
        return next(new ErrorHander("Product not found.", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Reviews
export const deleteProductReviews = catchAsyncError(async(req, res, next) => {
    const product = await productModel.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHander("Product not found.", 404));
    }

    const checkUser = product.reviews.filter(
        (rev) => {
            return rev._id.toString() === req.query.id.toString()
        }
    );

    if (checkUser[0].user.toString() !== req.user._id.toString()) {
        return next(new ErrorHander("Review is not by User.", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        if (rev.rating) avg += rev.rating;
    });

    let l = 1
    if (reviews.length) {
        l = reviews.length;
    }

    const ratings = avg / l;

    const numOfReviews = reviews.length;

    await productModel.findByIdAndUpdate(
        req.query.productId, {
            reviews,
            ratings,
            numOfReviews,
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});

// Create comment the review
export const createCommentReview = catchAsyncError(async(req, res, next) => {
    const { comment, productId } = req.body;

    const product = await productModel.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
        product.reviews.forEach(item => {
            if (item.user.toString() === req.user._id.toString()) {
                item.comments.push({ comment: comment });
            }
        })
    } else {
        product.reviews.push({
            comments: [{ comment: comment }],
        });
    }

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        product
    });
})

// Update comment the review
export const updateCommentReview = catchAsyncError(async(req, res, next) => {
    const { comment, productId } = req.body;

    const product = await productModel.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    const check = isReviewed.comments.find((com) => com._id.toString() === req.params.id.toString())

    if (!check) {
        return next(new ErrorHander("Comment is not by User.", 404));
    }

    if (isReviewed) {
        product.reviews.forEach(item => {
            item.comments.forEach(i => {
                if (i._id.toString() === req.params.id.toString()) {
                    (i.comment = comment)
                }
            })
        })
    }

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        product
    });
})


// remove comment the review
export const deleteCommentReview = catchAsyncError(async(req, res, next) => {

    const product = await productModel.findById(req.body.productId);

    if (!product) {
        return next(new ErrorHander("Product not found.", 404));
    }

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    const check = isReviewed.comments.find((com) => com._id.toString() === req.params.id.toString())

    if (!check) {
        return next(new ErrorHander("Comment is not by User.", 404));
    }

    let newReview = product.reviews.map(({ user, name, rating, _id, comments }) =>
        ({
            user,
            name,
            rating,
            _id,
            comments: comments.filter(({ _id: __id }) => {
                return req.params.id !== __id.toString();
            })
        })
    )

    let avg = 0;

    newReview.forEach((rev) => {
        if (rev.rating) {
            avg += rev.rating;
        }
    });

    const ratings = avg / newReview.length;

    const numOfReviews = newReview.length;

    await productModel.findByIdAndUpdate(
        req.body.productId, {
            reviews: newReview,
            ratings,
            numOfReviews,
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
})

export const getAllCommentReview = catchAsyncError(async(req, res, next) => {
    const product = await productModel.findById(req.body.productId);

    if (!product) {
        return next(new ErrorHander("Product not found.", 404));
    }
    let data = []

    product.reviews.forEach(({ comments }) => {
        if (comments.length !== 0) {
            return data.push(...comments)
        }
    });

    data.sort(function(x, y) {
        return y.updatedAt - x.updatedAt;
    });
    res.status(200).json({
        success: true,
        comments: data
    });
})