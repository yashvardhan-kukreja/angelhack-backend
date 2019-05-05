/**
 * Created by abhi on 21-Mar-18.
 */
const Promise = require('bluebird');
const User = require('../database/users/userSchema');
const Organisation = require('../database/organisations/organisationSchema');
const userTransactions = require('../database/users/userTransactions');
const organisationTransactions = require('../database/organisations/organisationTransactions');

try {
    var config = require('../config');
} catch (e) {
    console.log("Using environment variables instead of config variables");
}

const secret = process.env.SECRET || config.SECRET;

// Function returning a promise for executing the registration of a user
module.exports.registerUser = (name, username, email, password, contact) => {
    return new Promise((resolve, reject) => {
        if (name.trim() === "" || name.trim() === null || username.trim() === "" || username.trim() === null || email.trim() === "" || email.trim() === null || password.trim() === "" || password.trim() === null || contact.trim() === "" || contact.trim() === null)
            reject({success: false, message: "Please enter all the fields"});
        else {
            var user = new User({name: name, username: username, email: email, password: password, contact: contact});
            userTransactions.addUser(user, (err) => {
                if(err) {
                    console.log(err);
                    if (err.code === 11000)
                        reject({success: false, message: "A user already exists with the given username or email"});
                    else
                        reject({success: false, message: "An error occurred while signing up"});
                } else {
                    resolve({success: true, message: "User registred successfully"});
                }
            });
        }
    });
};

// Function returning a promise for executing the login of a user
module.exports.loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        userTransactions.findUserByUsernameOrEmail(email, (err, user) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!user) {
                    reject({success: false, message: "No user found with such username or email"});
                } else {
                    userTransactions.comparePassword(user, password, (err, validPassword) => {
                        if (!validPassword)
                            reject({success: false, message: "Wrong password entered"});
                        else {
                            var token = userTransactions.generateToken(user, secret);
                            resolve({success: true, message:"User authenticated successfully", token: token});
                        }
                    });
                }
            }
        });
    });
};

// Function returning a promise for executing the registration of an organisation
module.exports.registerOrganisation = (name, college, email, contact, password, org_logo_url) => {
    return new Promise((resolve, reject) => {
        if (name.trim() === "" || name.trim() === null || college.trim() === "" || college.trim() === null || email.trim() === "" || email.trim() === null || contact.trim() === "" || contact.trim() === null || password.trim() === "" || password.trim() === null) {
            reject({success: false, message: "Please enter all the fields completely"});
        } else {
            var organisation = new Organisation({
                orgName: name,
                college: college,
                concernedEmail: email,
                concernedContact: contact,
                password: password,
                orgLogoUrl: org_logo_url
            });
            organisationTransactions.addOrganisation(organisation, (err) => {
                if (err) {
                    console.log(err);
                    if (err.code === 11000)
                        reject({success: false, message: "An organisation already exists with the given email"});
                    else
                        reject({success: false, message: "An error occurred"});
                } else {
                    resolve({success: true, message: "Organisation registered successfully"});
                }
            });
        }
    });
};

// Function returning a promise for executing the login of an organisation
module.exports.loginOrganisation = (email, password) => {
    return new Promise((resolve, reject) => {
        organisationTransactions.findOrganisationByConcernedEmail(email, (err, organisation) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!organisation) {
                    reject({success: false, message: "No organisation found with such username or email"});
                } else {
                    organisationTransactions.comparePassword(organisation, password, (err, validPassword) => {
                        if (!validPassword)
                            reject({success: false, message: "Wrong password enetered"});
                        else {
                            var token = organisationTransactions.generateToken(organisation, secret);
                            resolve({success: true, message:"Organisation authenticated successfully", token: token});
                        }
                    });
                }
            }
        });
    });
};

