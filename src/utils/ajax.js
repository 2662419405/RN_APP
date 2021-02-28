import Axios from 'axios';

const DefaultUrl = 'http://app.shtodream.cn';

/**
 * Ajax返回数据统一处理
 * @param {Object} param0
 */
const ajax = ({url, method = 'get', data, success, error}) => {
  Axios({
    url: DefaultUrl + url,
    method,
    data,
  })
    .then((res) => {
      if (res && res.status === 200) {
        success(res.data);
      }
    })
    .catch((err) => {
      error(err);
    });
};

export default ajax;
