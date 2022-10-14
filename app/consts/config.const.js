const USERNAME_MINLEN = 6;
const USERNAME_MAXLEN = 32;
const PASSWORD_MINLEN = 6;
const PASSWORD_MAXLEN = 32;

const LOW_NO_ONE_TIME_PREKEYS = 5;

const MESSAGE_TYPE = {
  initial: 0,
  normal: 1,
};

const KEY_STATE = {
  ok: 0,
  notUploaded: 1,
  lowOneTime: 2, 
}

module.exports = {
  USERNAME_MINLEN,
  USERNAME_MAXLEN,
  PASSWORD_MINLEN,
  PASSWORD_MAXLEN,

  LOW_NO_ONE_TIME_PREKEYS, 
  
  MESSAGE_TYPE,
  KEY_STATE,
}