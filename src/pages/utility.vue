<script setup>
import Hero from '@/components/layout/hero.vue';
import Balans from '@/views/utility/balans.vue';
import Category from '@/views/utility/client.vue';
import Withdraw from '@/views/utility/withdraw.vue';

</script>

<template>
	<Hero />
	<div class="mt-5 mb-5 p-5 text-white rounded-4xl bg-white/20 backdrop-blur-xs">
		<Balans />
		<Withdraw />
	</div>
	<Category />
</template>

<style></style>
