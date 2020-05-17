<template>
    <div class="flex">
        <UserSummaryCard v-for="item in cardData" :key="item.id" class="m-4"
        :img="item.img" :name="item.name" :number="item.number">
            
        </UserSummaryCard>

    </div>
</template>

<script>
import UserSummaryCard from '@/components/small/UserSummaryCard.vue';
export default {
    name: 'Explore',
    components: {
        UserSummaryCard,
    },
    data() {
        return {
            cardData:[
                {
                    img: 'https://picsum.photos/id/23/200',
                    name: 'Marta',
                    number: 2
                },
                {
                    img: 'https://picsum.photos/id/24/200',
                    name: 'Pepe',
                    number: 4
                },
                {
                    img: 'https://picsum.photos/id/25/200',
                    name: 'Lucas',
                    number: 3
                },
                {
                    img: 'https://picsum.photos/id/28/200',
                    name: 'Jomi',
                    number:1
                },
                {
                    img: 'https://picsum.photos/id/211/200',
                    name: 'Curry',
                    number:5
                },
                {
                    img: 'https://picsum.photos/id/78/200',
                    name: 'Fefe',
                    number:6
                },
                {
                    img: 'https://picsum.photos/id/256/200',
                    name: 'Heráclito',
                    number: 7
                },
                {
                    img: 'https://picsum.photos/id/236/200',
                    name: 'Nabillo',
                    number: 3
                },
                {
                    img: 'https://picsum.photos/id/222/200',
                    name: 'Soretio',
                    number: 2
                },

            ]
            
        };
    },
    
    
        
};
</script>