const { BlogModel } = require("../model");
const Response = require("./Response");

class Blogs extends Response {
  createBlog = async (req, res) => {
    try {
      const {
        title,
        featuredImage,
        category,
        tags,
        content,
        excerpt,
        author,
        publishDate,
        readTime,
        isPublished,
        seoTitle,
        seoDescription,
        seoKeywords,
        relatedPosts,
        comments,
      } = req.body;

      if (!title || !content) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Title and content are required",
        });
      }

      const newBlog = new BlogModel({
        title,
        featuredImage,
        category,
        tags,
        content,
        excerpt,
        author,
        publishDate,
        readTime,
        isPublished,
        seoTitle,
        seoDescription,
        seoKeywords,
        relatedPosts,
        comments,
      });

      await newBlog.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Blog created successfully",
        data: newBlog,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  getAllBlogs = async (req, res) => {
    try {
      const { category, isPublished, page = 1, limit = 10 } = req.query;
      
      const filter = {};
      if (category) filter.category = category;
      if (isPublished !== undefined) filter.isPublished = isPublished === 'true';

      const skip = (page - 1) * limit;
      
      const blogs = await BlogModel.find(filter)
        .populate("featuredImage")
        .populate("author")
        .populate("relatedPosts")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await BlogModel.countDocuments(filter);

      return this.sendResponse(req, res, {
        status: 200,
        message: "Blogs retrieved successfully",
        data: {
          blogs,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalBlogs: total,
            hasNext: page * limit < total,
            hasPrev: page > 1,
          },
        },
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  getBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await BlogModel.findById(id)
        .populate("featuredImage")
        .populate("author")
        .populate("relatedPosts");

      if (!blog) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Blog not found",
        });
      }

      // Increment view count
      blog.views = (blog.views || 0) + 1;
      await blog.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Blog found",
        data: blog,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  getBlogBySlug = async (req, res) => {
    try {
      const { slug } = req.params;
      const blog = await BlogModel.findOne({ slug })
        .populate("featuredImage")
        .populate("author")
        .populate("relatedPosts");

      if (!blog) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Blog not found",
        });
      }

      // Increment view count
      blog.views = (blog.views || 0) + 1;
      await blog.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Blog found",
        data: blog,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  updateBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        featuredImage,
        category,
        tags,
        content,
        excerpt,
        author,
        publishDate,
        readTime,
        isPublished,
        seoTitle,
        seoDescription,
        seoKeywords,
        relatedPosts,
        comments,
      } = req.body;

      const updateData = {
        ...(title && { title }),
        ...(featuredImage && { featuredImage }),
        ...(category && { category }),
        ...(tags && { tags }),
        ...(content && { content }),
        ...(excerpt && { excerpt }),
        ...(author && { author }),
        ...(publishDate && { publishDate }),
        ...(readTime && { readTime }),
        ...(isPublished !== undefined && { isPublished }),
        ...(seoTitle && { seoTitle }),
        ...(seoDescription && { seoDescription }),
        ...(seoKeywords && { seoKeywords }),
        ...(relatedPosts && { relatedPosts }),
        ...(comments && { comments }),
      };

      const updatedBlog = await BlogModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedBlog) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Blog not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "Blog updated successfully",
        data: updatedBlog,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;

      const deletedBlog = await BlogModel.findByIdAndDelete(id);

      if (!deletedBlog) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Blog not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "Blog deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  getPopularBlogs = async (req, res) => {
    try {
      const { limit = 5 } = req.query;
      
      const blogs = await BlogModel.find({ isPublished: true })
        .populate("featuredImage")
        .populate("author")
        .sort({ views: -1 })
        .limit(parseInt(limit));

      return this.sendResponse(req, res, {
        status: 200,
        message: "Popular blogs retrieved successfully",
        data: blogs,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  getRecentBlogs = async (req, res) => {
    try {
      const { limit = 5 } = req.query;
      
      const blogs = await BlogModel.find({ isPublished: true })
        .populate("featuredImage")
        .populate("author")
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));

      return this.sendResponse(req, res, {
        status: 200,
        message: "Recent blogs retrieved successfully",
        data: blogs,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  searchBlogs = async (req, res) => {
    try {
      const { q, category, tags, page = 1, limit = 10 } = req.query;
      
      const filter = { isPublished: true };
      
      if (q) {
        filter.$or = [
          { title: { $regex: q, $options: 'i' } },
          { content: { $regex: q, $options: 'i' } },
          { excerpt: { $regex: q, $options: 'i' } },
        ];
      }
      
      if (category) filter.category = category;
      if (tags) filter.tags = { $in: tags.split(',') };

      const skip = (page - 1) * limit;
      
      const blogs = await BlogModel.find(filter)
        .populate("featuredImage")
        .populate("author")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await BlogModel.countDocuments(filter);

      return this.sendResponse(req, res, {
        status: 200,
        message: "Blog search completed successfully",
        data: {
          blogs,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalBlogs: total,
            hasNext: page * limit < total,
            hasPrev: page > 1,
          },
        },
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };
}

module.exports = { Blogs };