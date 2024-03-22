<template>
    <div class="load-container">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.load-container{
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    bottom: 0 !important;
    height: 100vh !important;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.lds-ring {
  position: fixed;
  top: 50vh;
  margin: auto !important;
  padding: auto !important;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #ff0000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #4e4e4e transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>