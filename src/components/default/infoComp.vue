<script setup>
    import { ref, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router';
    import { useMainStore } from "@/stores/main";

    const mainStore = useMainStore()
    const route = useRoute()

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
    function doModal() {
        modalState.value = !modalState.value
    }

    const comments = ref()
    const getComments = async () => {
        let res = await mainStore.getAllComments()
        if (res.data) {
            comments.value = res.data
            console.log(comments.value)
        }
    }

    const comm = ref({
        name: '',
        phone: '',
        text: '',
        discussion: route.params?.id
    })
    function sendComm() {
        mainStore.sendComment(comm.value)
        comm.value.name = ''
        comm.value.phone = ''
        comm.value.text = ''
        doModal()
        getComments()
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
        }
    )
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
                <div >
                    
                </div>
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
                            <div class="modal__title">Оставьте комментарий</div>

                            <button class="modal__cls" @click="doModal">
                                <img src="@/assets/logo/close.svg">
                            </button>
                        </div>

                        <div class="modal__inputs">
                            <div class="modal__half">
                                <input type="text" class="modal__input" placeholder="Ф.И.О." v-model="comm.name">
                                <input type="num" class="modal__input" placeholder="Номер телефона" v-model="comm.phone">
                            </div>
                            <div class="modal__half">
                                <textarea name="message" cols="30" rows="10" class="modal__textarea" placeholder="Сообщение" v-model="comm.text"></textarea>
                            </div>
                        </div>

                        <button class="modal__btn" @click="sendComm">Отправить</button>
                    </div>
                </div>

                
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/components/default/info.scss';
</style>