export const APPNAME = "Xavren"
export const APPEMAIL = "princewillasotibe123@gmail.com"
export const APPTWITERURL = "https://x.com/xavrenvault?s=21"
export const APPNAME_3 = "xavren"
export const APPNAME_2 = "XavRen"
export const production = true
export const SERVERDOMAIN = production?"https://xavren-server.onrender.com":"http://172.20.10.3:5002";
export const DOMAIN = production?"https://xavren.vercel.app":"http://localhost:3000";
export const DOMAINAPI = DOMAIN +"/api";
export const GITHUBURL = DOMAINAPI + "/auth/github"
export const GOOGLEURL = DOMAINAPI + "/auth/google"
export const GOOGLECALLBACKURL = DOMAINAPI + "/auth/google/callback"
export const GITHUBCALLBACKURL = DOMAINAPI + "/auth/github/callback"
export const SIGNUPURL =DOMAINAPI+"/auth/signup"
export const LOGINURL =DOMAINAPI+"/auth/login"
export const CREATESECRETPHRASEURL =DOMAINAPI+"/auth/create-secret-phrase"
export const VERIFYSECRETPHRASEURL =DOMAINAPI+"/auth/verify-secret-phrase"
export const GETSIGNEDKEYURL =DOMAINAPI+"/auth/signed-key"
export const VERIFYOTP =DOMAINAPI+"/auth/verify-otp"
export const VERIFYEMAILURL =DOMAINAPI+"/auth/verify-email"
export const RESENDOTP =DOMAINAPI+"/auth/resend-otp"
export const RESETPASSWORD =DOMAINAPI+"/auth/reset-password"
export const FORGOTPASSWORD =DOMAINAPI+"/auth/forgot-password"
export const LOGOUT =DOMAINAPI+"/auth/logout"
export const PUBLICKEY = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvcEalu9yuELFXFHDGDIM\nnsl2s26P0953z9fjW3ZD1jt8aLJAh5G2Tw0kFhenkDtXGXv4GQuGRSmTNXA2rLqt\njXf5rtxEKp5KPL96+rILhnrIW0NwirIWCpRLgr3Q8LPGSLZzF2zFqiP3TQ9PclK8\nPE1GhxEfr/H0dBzPP9h8DPYQe41i5XrG8P4IcLIaSm6uHSuNbDI76jwkPktmGJYl\nxpBlHL3USpHd5R/SgQ5ZBRMgDOpFBoEr9Gpmg/mD1VAhq1QCpytu/B6x37JDPwVt\nJ+215kxRuMPEVNrsCJim8rPJjexGx2CRku1GeXscogDPNl1Nf03AElb1HsrwBbjC\nAwIDAQAB\n-----END PUBLIC KEY-----"

export enum OTPTYPE {
  forgotPassword = "forgotPassword",
  emailVerification = "emailVerification",
}

export const CREATEPROJECTURL = DOMAINAPI +"/projects/create"
export const ADDENVURL = DOMAINAPI +"/projects/env/add"
export const FETCHENVURL = DOMAINAPI +"/projects/env"
export const UPDATEENVURL = DOMAINAPI +"/projects/env/update"
export const DELETEENVURL = DOMAINAPI +"/projects/env"
export const UPDATEBIOURL = DOMAINAPI +"/auth/update-user-biodata"
export const UPDATEUSERSETIINGSURL = DOMAINAPI +"/auth/user-settings"
export const GETUSERSETIINGSURL = DOMAINAPI +"/auth/user-settings"
export const GETUSERSURL = DOMAINAPI +"/auth/find-users"
export const DELETEPROJECTURL = DOMAINAPI +"/projects"
export const GETPROJECTBYIDURL = DOMAINAPI +"/projects/one"
export const GETCOMMITSURL = DOMAINAPI +"/projects/commits"
export const GETCOMMITURL = DOMAINAPI +"/projects/commit"
export const GETBRANCHESURL = DOMAINAPI +"/projects/branches"
export const FETCHPROJECTURL = DOMAINAPI +"/projects"
export const HISTPROJECTKEYROTATIONURL = DOMAINAPI +"/projects/hist-for-pkey-rotation"
export const UPGRADEVERSIONURL = DOMAINAPI +"/projects/upgrade-pkey-version"
export const INVITECOLABURL = DOMAINAPI +"/projects/invite-collab"
export const GETCOLABURL = DOMAINAPI +"/projects/get-collab"
export const GETTEAMMEMBERSURL = DOMAINAPI +"/projects/get-team-members"
export const REMOVETEAMMEMBERSURL = DOMAINAPI +"/projects/remove-team-members"
export const ACCEPTCOLABURL = DOMAINAPI +"/projects/accept-collab"
export const DECLINECOLABINVITEURL = DOMAINAPI +"/projects/decline-collab-invite"
export const NOTIFICATIONURL = DOMAINAPI +"/nots"
export const GETPLANSURL = DOMAINAPI +"/payment/plans"
export const SUSCRIBEURL = DOMAINAPI +"/payment/suscribe"
export const CURRENTSUSCRIBTIONURL = DOMAINAPI +"/payment/current-subscription"
export const GETTRANASCTIONSURL = DOMAINAPI +"/payment/transactions"

// export const APPNAME = "Xavren"

export const  creditVersion =true
export const  creditDurationMonth =3