<template>
    <div class="modal">
      <div class="modal-content">
        <span @click="$emit('close')" class="close">&times;</span>
        <!-- 로그인 폼 -->
        <form @submit.prevent="handleLogin">
          <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" name="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" name="password" required>
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  </template>

<script>
  export default {
  data() {
    return {
      username: '',  // 사용자 이름
      password: ''   // 비밀번호
    };
  },
  methods: {
    async handleLogin() {
      // 서버로 전송할 데이터
      const loginData = {
        username: this.username,
        password: this.password
      };
      
      try {
        // Fetch API를 이용한 POST 요청
        const response = await fetch('http://119.197.155.172:50052/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)  // JSON으로 변환하여 전송
        });

        // 서버의 응답 처리
        if (response.ok) {
          const result = await response.json();
          alert('로그인 성공!');
          console.log(result);

          const token = result.token; //토큰 추출
          console.log('받은 토큰: ',token); //토큰 로그 출력
          localStorage.setItem('token', token);  //토큰을 저장
          //이후 필요한 경우 이 토큰을 이용해 API요청등을 진행
          
        } else {
          alert('로그인 실패');
        }
      } catch (error) {
        console.error('에러 발생:', error);
        alert('로그인 중 에러 발생');
      }
    }
  }
};
</script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000; /* 모달이 다른 요소들보다 위에 표시되도록 */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 배경 흐리게 */
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  
  form label {
    display: block;
    margin-top: 10px;
  }
  
  form input {
    display: block;
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box; /* padding이 width에 포함되도록 */
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  
  .close:hover {
    color: red;
  }
  </style>