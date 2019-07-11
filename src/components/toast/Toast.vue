<template>
    <div class='toast' v-if='toastShow' >
        <img v-if="imgUrl" :src="imgUrl" :alt="toastText">
        <p>{{toastText}}</p>
    </div>
</template>

<script>

export default {
    name: 'toast',
    props: {
        imgUrl: {
            type: String,
        },
        toastText: {
            type: String
        },
        toastShow: {
            type: Boolean,
            default: true
        },
        duration: {
            type: Number,
            default: 1500
        }

    },
    mounted() {
    },
    updated() {
        this.$emit('handleToast');
    },
}
</script>



<style lang="scss">

@keyframes scale {
    from {
        transform: scale(0.1);
    }
    to {
        transform: scale(1);
    }
}

.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    width: 100px;
    max-height: 100px;
    background-color: #000;
    z-index: 1001;
    border-radius: 10px;
    animation: scale 0.1s ease-in;
    img {
        display: block;
        width: 70px;
        height: 70px;
        margin: 5px auto;
    }
    p {
        color: #fff;
        text-align: center;
        padding: .256rem 0;
    }
}
</style>
