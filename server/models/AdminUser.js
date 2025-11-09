import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'subadmin'],
      default: 'subadmin',
    },
    permissions: {
      canViewAnalytics: { type: Boolean, default: false },
      canViewInquiries: { type: Boolean, default: true },
      canViewLeads: { type: Boolean, default: true },
      canViewProducts: { type: Boolean, default: true },
      canDeleteInquiries: { type: Boolean, default: false },
      canDeleteLeads: { type: Boolean, default: false },
      canEditProducts: { type: Boolean, default: false },
      canAddProducts: { type: Boolean, default: false },
      canDeleteProducts: { type: Boolean, default: false },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    createdBy: {
      type: String, // Admin username who created this user
    },
  },
  {
    timestamps: true,
    collection: 'admin_users',
  }
);

// Hash password before saving
adminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
adminUserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get safe user object (without password)
adminUserSchema.methods.toSafeObject = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    fullName: this.fullName,
    role: this.role,
    permissions: this.permissions,
    isActive: this.isActive,
    lastLogin: this.lastLogin,
  };
};

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

export { AdminUser };
