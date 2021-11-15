import { productModel } from "../models/productModel.js";
import ErrorHander from "../utils/errorhander.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apifeatures.js";

// Get All Products
export const getAllProduct = catchAsyncError(async (req, res, next) => {
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
export const getDetailsProduct = catchAsyncError(async (req, res, next) => {
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
export const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Update Product -- Admin
export const updateProduct = catchAsyncError(async (req, res, next) => {
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

export const deleteProduct = catchAsyncError(async (req, res, next) => {
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

// Create New Review or Update the review

export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.fullname,
    rating: Number(rating),
    comment,
  };

  const product = await productModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
export const getProductReviews = catchAsyncError(async (req, res, next) => {
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
export const deleteProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found.", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
