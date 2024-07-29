<script setup>
    import { ref, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { useMainStore } from "@/stores/main"
    import { storeToRefs } from 'pinia'

    const mainStore = useMainStore()
    const route = useRoute()
    const { comments } = storeToRefs(mainStore)

    const list = ref([
        {
            title: 'Разработчик проекта',
            info: 'Верховный суд Республики Узбекистан'
        },
        {
            title: 'Дата размещения',
            info: '19/07/2024'
        },
        {
            title: 'Дата завершения',
            info: '03/09/2024'
        },
        {
            title: 'Кол-во предложений',
            info: '0'
        },
    ])
    
    const info = ref()
    const getData = async (param) => {
        let res = await mainStore.getDiscussion(param)
        if (res.data) {
            info.value = res.data
            // console.log(list.value)
        }
    }

    // Modal 
    const modalState = ref(false)
    const modalSent = ref(false)
    function doModal() {
        if (modalSent.value = false) {
            modalState.value = false
        } else { 
            modalState.value = !modalState.value
        }
    }

    const getComments = async () => {
        await mainStore.getAllComments()
    }

    function doRequire() {
        
    }
    const comm = ref({
        name: '',
        phone: '',
        text: '',
        discussion: route.params?.id
    })
    function sendComm() {
        if (
            comm.value.name.length > 0 &&
            comm.value.phone.length > 0 &&
            comm.value.text.length > 0
        ) {
            mainStore.sendComment(comm.value)
            comm.value.name = ''
            comm.value.phone = ''
            comm.value.text = ''
            modalSent.value = true
            // getComments()
        } else {
            doRequire()
        }
    }

    onMounted(() => {
        getData(route.params.id)
        getComments()
    })

    function changeBody() {
        if (modalState.value == true) {
            document.body.classList.add('noscroll')
        } else {
            document.body.classList.remove('noscroll')
        }
    }

    watch(
    () => modalState.value,
    () => {
        changeBody()
    })
</script>

<template>
    <div class="info">
        <div class="container">
            <div class="info__box">
                <div class="info__left">
                    <div class="info__title big">{{ info?.title }}</div>
                    <div class="info__content" v-html="`<b>Test Content</b>`"></div>
                </div>

                <div class="info__right">
                    <div class="info__title">Информация</div>

                    <ul class="info__list">
                        <li class="item">
                            <div class="item__left">ID:</div>
                            <div class="item__right">{{ route.params?.id }}</div>
                        </li>
                        <li class="item" v-for="item of list" :key="item">
                            <div class="item__left">{{ item?.title }}:</div>
                            <div class="item__right">{{ item?.info }}</div>
                        </li>
                    </ul>

                    <button class="info__btn" @click="doModal">
                        <img src="@/assets/logo/help.svg">
                        Опросник
                    </button>
                </div>
            </div>

            <div class="info__bot">
                <div class="info__invisible"></div>
                <div class="info__right">
                    <div class="comments">
                        <div class="comments__title info__title">Комментарии</div>

                        <ul class="comments__list">
                            <li class="item" v-for="item of comments?.comment" :key="item">
                                <div class="item__top">
                                    <div class="item__logo">{{ item?.name[0] }}</div>

                                    <div class="item__name">{{ item?.name }}</div>
                                </div>

                                <div class="item__bot">
                                    <div class="item__text">{{ item?.text }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div :class="modalState ? 'modal active' : 'modal'">
                <div class="modal__bg" @click="doModal"></div>
                <div class="modal__box">
                    
                    <div>
                        <div class="modal__head">
                            <div class="modal__title" v-if="!modalSent">Оставьте комментарий</div>
                            <div class="modal__title" v-if="modalSent">Ваща заявка принята</div>

                            <button class="modal__cls" @click="doModal" v-if="!modalSent">
                                <img src="@/assets/logo/close.svg">
                            </button>
                        </div>

                        <div class="modal__inputs" v-if="!modalSent">
                            <div class="modal__half">
                                <input type="text" class="modal__input" placeholder="Ф.И.О." v-model="comm.name">
                                <input type="num" class="modal__input" placeholder="Номер телефона" v-model="comm.phone">
                            </div>
                            <div class="modal__half">
                                <textarea name="message" cols="30" rows="10" class="modal__textarea" placeholder="Сообщение" v-model="comm.text"></textarea>
                            </div>
                        </div>

                        <!-- <div class="modeal__sent" v-else>
                            Comment Sent
                        </div> -->

                        <button class="modal__btn" @click="sendComm" v-if="!modalSent">Отправить</button>
                        <button class="modal__btn" @click="doModal" v-if="modalSent">Понятно</button>
                    </div>

                    
                </div>

                
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/components/default/info.scss';
</style>