/**
 * @file Declares User data type representing the details of the user
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @typedef User Represents the detail data about the user
 * @property {string} username string of the name of the user
 * @property {string} password string of the password
 * @property {string} firstName string of the first name of the user
 * @property {string} lastName string of the last name of the user
 * @property {string} email string of the email address
 * @property {string} profilePhoto string of the photo
 * @property {string} headerImage string of the header image
 * @property {AccountType} accountType AccountType type of the account
 * @property {MaritalStatus} maritalStatus MaritalStatus shows the marital status of the user
 * @property {string} biography string of the biography of the user
 * @property {Date} dateOfBirth Date of the user's birthday
 * @property {Date} joined Date of the user joined Tuiter
 * @property {Location} location Location of the user
 */
export default class User {
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}
