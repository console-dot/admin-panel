const mongoose = require("mongoose");

const blog = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  featuredImage: {
    type: mongoose.Types.ObjectId,
    ref: "File",
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: 300,
  },
  author: {
    type: String,
    // Assuming you have a User model
    // required: true,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  readTime: {
    type: Number, // in minutes
    default: 1,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  // SEO fields
  seoTitle: {
    type: String,
    trim: true,
    maxlength: 60,
  },
  seoDescription: {
    type: String,
    trim: true,
    maxlength: 160,
  },
  seoKeywords: [{
    type: String,
    trim: true,
  }],
  // Related posts
  relatedPosts: [{
    type: mongoose.Types.ObjectId,
    ref: "Blog",
  }],
  // Comments system
  comments: [{
    author: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    replies: [{
      author: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  }],
}, {
  timestamps: true, // This adds createdAt and updatedAt fields
});

// Create slug from title before saving
blog.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Auto-generate excerpt from content if not provided
blog.pre('save', function(next) {
  if (this.isModified('content') && !this.excerpt) {
    // Remove HTML tags and get first 150 characters
    const plainText = this.content.replace(/<[^>]*>/g, '');
    this.excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
  }
  next();
});

// Calculate read time based on content
blog.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

// Index for better search performance
blog.index({ title: 'text', content: 'text', excerpt: 'text' });
blog.index({ category: 1 });
blog.index({ tags: 1 });
blog.index({ isPublished: 1 });
blog.index({ publishDate: -1 });
blog.index({ views: -1 });

const BlogModel = mongoose.model("Blog", blog);
module.exports = { BlogModel };