import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from "../config/config";
import UserSchema from '../models/user.model';

const saltRounds = 10;


