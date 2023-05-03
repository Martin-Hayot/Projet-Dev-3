<script>
	export default {
		data() {
			const date = new Date();
			const days = [];
			const currYear = date.getFullYear();
			const currMonth = date.getMonth();
			const months = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			return {
				days,
				currYear,
				currMonth,
				months,
				currentDate: `${months[currMonth]} ${currYear}`,
			};
		},
		methods: {
			renderCalendar() {
				let first_day = new Date(this.currYear, this.currMonth, 1).getDay();
				let lastDateOfMonth = new Date(
					this.currYear,
					this.currMonth + 1,
					0
				).getDate();
				let lastDateofLastMonth = new Date(
					this.currYear,
					this.currMonth,
					0
				).getDate();
				let lastDayOfMonth = new Date(
					this.currYear,
					this.currMonth,
					lastDateOfMonth
				).getDay();
				for (let i = first_day - 1; i > 0; i--) {
					this.days.push(lastDateofLastMonth - i + 1);
				}
				for (let i = 1; i <= lastDateOfMonth; i++) {
					this.days.push(i);
				}
				for (let i = lastDayOfMonth; i < 6; i++) {
					this.days.push(i - lastDayOfMonth + 1);
				}
				return this.days;
			},
			PreviousMonth() {
				if (this.currMonth < 11) {
					this.currMonth++;
					this.currentDate = `${this.months[this.currMonth]} ${this.currYear}`;
				} else {
					this.currMonth = 0;
					this.currYear++;
					this.currentDate = `${this.months[this.currMonth]} ${this.currYear}`;
				}
				this.days = [];
				this.days = this.renderCalendar();
			},
			NextMonth() {
				if (this.currMonth > 0) {
					this.currMonth--;
					this.currentDate = `${this.months[this.currMonth]} ${this.currYear}`;
				} else {
					this.currMonth = 11;
					this.currYear--;
					this.currentDate = `${this.months[this.currMonth]} ${this.currYear}`;
				}
				this.days = [];
				this.days = this.renderCalendar();
			},
		},
		computed: {
			daysInMonth() {
				return this.renderCalendar();
			},
		},
		beforeMount() {
			this.days = this.renderCalendar();
		},
	};
</script>

<template>
	<div class="tw-flex tw-items-center tw-justify-center tw-py-8 tw-px-4">
		<div class="tw-max-w-sm tw-w-full tw-shadow-lg">
			<div
				class="md:tw-p-8 tw-p-5 dark:tw-bg-gray-800 tw-bg-white tw-rounded-t"
			>
				<div class="tw-px-4 tw-flex tw-items-center tw-justify-between">
					<span
						tabindex="0"
						class="focus:tw-outline-none tw-text-base tw-font-bold dark:tw-text-gray-100 tw-text-gray-800"
						>{{ currentDate }}</span
					>
					<div class="tw-flex tw-items-center">
						<button
							aria-label="calendar backward"
							class="focus:tw-text-gray-400 hover:tw-text-gray-400 tw-text-gray-800 dark:tw-text-gray-100"
							@click="NextMonth"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-chevron-left"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<polyline points="15 6 9 12 15 18" />
							</svg>
						</button>
						<button
							aria-label="calendar forward"
							class="focus:tw-text-gray-400 hover:tw-text-gray-400 tw-ml-3 tw-text-gray-800 dark:tw-text-gray-100"
							@click="PreviousMonth"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-chevron-right"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</button>
					</div>
				</div>
				<div
					class="tw-flex tw-items-center tw-justify-between tw-pt-12 tw-overflow-x-auto"
				>
					<table class="tw-w-full">
						<thead>
							<tr>
								<th>
									<div class="tw-w-full tw-flex tw-justify-center">
										<p
											class="tw-text-base tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
										>
											Mo
										</p>
									</div>
								</th>
								<th>
									<div class="tw-w-full tw-flex tw-justify-center">
										<p
											class="tw-text-base tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
										>
											Tu
										</p>
									</div>
								</th>
								<th>
									<div class="tw-w-full tw-flex tw-justify-center">
										<p
											class="tw-text-base tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
										>
											We
										</p>
									</div>
								</th>
								<th>
									<div class="tw-w-full tw-flex tw-justify-center">
										<p
											class="tw-text-base tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
										>
											Th
										</p>
									</div>
								</th>
								<th>
									<div class="tw-w-full tw-flex tw-justify-center">
										<p
											class="tw-text-base tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
										>
											Fr
										</p>
									</div>
								</th>
								<th>
									<div class="tw-w-full tw-flex tw-justify-center">
										<p
											class="tw-text-base tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
										>
											Sa
										</p>
									</div>
								</th>
								<th>
									<div class="tw-w-full tw-flex tw-justify-center">
										<p
											class="tw-text-base tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
										>
											Su
										</p>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<ul class="tw-flex tw-flex-wrap tw-gap-2">
								<li
									v-for="day in days"
									class="tw-text-base tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
								>
									{{ day }}
								</li>
							</ul>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
