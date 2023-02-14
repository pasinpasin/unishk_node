const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Duhet email"],
      unique: [true, "email duhet unik"],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Format email gabim"],
    },
    password: {
      type: String,
      required: [true, "Duhet password"],
    },
    passwordconfirm: {
      type: String,
      required: [true, "Konfirmo password"],
      validate: {
        //funksionon vetme per create dhe save
        validator: function (el) {
          return el === this.password;
        },
        message: "passwodet nuk perputhen",
      },
    },

    emri: {
      type: String,
      required: [true, "Duhet emri"],

      trim: true,
    },
    mbiemri: {
      type: String,
      required: [true, "Duhet mbiemri"],

      trim: true,
    },
    atesia: {
      type: String,
      required: [true, "Duhet atesia"],

      trim: true,
    },
    titulli: {
      type: String,
      enum: ["MSc", "Dr.", "Prof.Dr", "Doc", "Prof.Asoc. Dr"],
      default: "MSc",
    },
    fakulteti: {
      type: mongoose.Schema.ObjectId,
      ref: "Fakulteti",
      required: [true, "Duhe te perkasin nje fakulteti"],
      // select: false
    },

    departamenti: {
      type: mongoose.Schema.ObjectId,
      ref: "Departamenti",
      required: [true, "Duhe te perkasin nje departamenti"],
    },

    role: {
      type: String,
      enum: ["admin", "pedagog", "shefdepartamenti", "dekan", "kurrikula"],
      default: "pedagog",
    },

    passwordChangedAt: Date,
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordconfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
