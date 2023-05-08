<script>
	export default {
		data() {
			const date = new Date();
			const days = [];
			const currYear = date.getFullYear();
			const currMonth = date.getMonth();
			const thisMonth = date.getMonth();
			const thisYear = date.getFullYear();
			const today = date.getDate();
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
			let selectedDate = "";
			return {
				isActive: false,
				days,
				currYear,
				currMonth,
				today,
				thisYear,
				thisMonth,
				months,
				currentDate: `${months[currMonth]} ${currYear}`,
				selectedDate,
			};
		},
		methods: {
			renderCalendar() {
				let first_day = new Date(this.currYear, this.currMonth, 1).getDay() - 1;
				if (first_day === -1) {
					first_day = 6; // Sunday
				}
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
				for (let i = first_day; i > 0; i--) {
					this.days.push({
						day: lastDateofLastMonth - i + 1,
						isInCurrMonth: "prev",
						isToday: false,
						isTaken: false,
					});
				}
				for (let i = 1; i <= lastDateOfMonth; i++) {
					if (
						i == this.today &&
						this.currMonth == this.thisMonth &&
						this.currYear == this.thisYear
					) {
						this.days.push({
							day: i,
							isInCurrMonth: "curr",
							isToday: true,
							isTaken: false,
						});
						continue;
					}
					this.days.push({
						day: i,
						isInCurrMonth: "curr",
						isToday: false,
						isTaken: false,
					});
				}
				for (let i = lastDayOfMonth; i < 7; i++) {
					this.days.push({
						day: i - lastDayOfMonth + 1,
						isInCurrMonth: "next",
						isToday: false,
						isTaken: false,
					});
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
			SelectDate(day, month, year, isInCurrMonth) {
				if (isInCurrMonth == "prev")
					this.selectedDate = `${day}/${month}/${year}`;
				else if (isInCurrMonth == "curr")
					this.selectedDate = `${day}/${month + 1}/${year}`;
				else if (isInCurrMonth == "next")
					this.selectedDate = `${day}/${month + 2}/${year}`;
			},
			TakeDate() {
				this.days.forEach((day) => {
					if (day.day == this.selectedDate.split("/")[0]) {
						day.isTaken = true;
					}
				});
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
	<div class="tw-flex tw-flex-col tw-justify-center tw-align-center tw-p-10">
		<h1 class="tw-text-4xl">Pick a date</h1>
		<p>Max of 3 tracks per day</p>
	</div>
	<div
		class="tw-flex tw-items-center tw-justify-start tw-gap-8 tw-py-8 tw-px-4 tw-ml-5"
	>
		<div class="tw-max-w-xl tw-w-full tw-shadow-lg">
			<div
				class="md:tw-p-6 tw-p-4 dark:tw-bg-gray-800 tw-bg-white tw-rounded-t"
			>
				<div class="tw-px-4 tw-flex tw-items-center tw-justify-between">
					<span
						tabindex="0"
						class="focus:tw-outline-none tw-text-3xl tw-font-bold dark:tw-text-gray-100 tw-text-gray-800"
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
				<div class="tw-pt-10 tw-pb-6 tw-text-xl tw-overflow-x-auto">
					<table class="tw-w-full">
						<tr class="tw-grid tw-grid-cols-7">
							<th>
								<div class="tw-w-full tw-flex tw-justify-center">
									<p
										class="tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
									>
										Mo
									</p>
								</div>
							</th>
							<th>
								<div class="tw-w-full tw-flex tw-justify-center">
									<p
										class="tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
									>
										Tu
									</p>
								</div>
							</th>
							<th>
								<div class="tw-w-full tw-flex tw-justify-center">
									<p
										class="tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
									>
										We
									</p>
								</div>
							</th>
							<th>
								<div class="tw-w-full tw-flex tw-justify-center">
									<p
										class="tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
									>
										Th
									</p>
								</div>
							</th>
							<th>
								<div class="tw-w-full tw-flex tw-justify-center">
									<p
										class="tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
									>
										Fr
									</p>
								</div>
							</th>
							<th>
								<div class="tw-w-full tw-flex tw-justify-center">
									<p
										class="tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
									>
										Sa
									</p>
								</div>
							</th>
							<th>
								<div class="tw-w-full tw-flex tw-justify-center">
									<p
										class="tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100"
									>
										Su
									</p>
								</div>
							</th>
						</tr>
					</table>
				</div>
				<div>
					<div>
						<ul class="px-2 tw-grid tw-grid-cols-7 tw-gap-4">
							<li
								v-for="day in days"
								class="tw-text-base tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100 tw-py-1"
								:class="{
									inactive:
										day.isInCurrMonth == 'prev' ||
										day.isInCurrMonth == 'next' ||
										day.isTaken,
									'hover:tw-rounded-full hover:tw-bg-slate-900 tw-cursor-pointer':
										day.isInCurrMonth == 'curr' && !day.isTaken,
									'tw-bg-blue-500': day.isToday,
									'tw-rounded-full': day.isToday,
								}"
								@click="
									if (day.isInCurrMonth == 'curr' && !day.isTaken) {
										isActive = true;
										SelectDate(day.day, currMonth, currYear, day.isInCurrMonth);
									}
								"
							>
								{{ day.day }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="isActive"
			class="tw-max-w-sm tw-w-full tw-shadow-lg tw-text-gray-800 dark:tw-text-gray-100"
		>
			<div
				class="md:tw-p-6 tw-p-4 dark:tw-bg-gray-800 tw-bg-white tw-rounded-t"
			>
				<form @submit.prevent="TakeDate">
					<p>
						{{ selectedDate }}
					</p>
					<div class="tw-flex tw-flex-col tw-my-2 tw-mb-6">
						<label for="nbrTrack">Number of tracks</label>
						<input
							type="number"
							name="nbrTrack"
							max="3"
							min="1"
							value="1"
							required
							class="tw-bg-slate-100 tw-w-32 tw-py-2 tw-px-4 tw-text-gray-700 tw-border tw-border-gray-300 tw-rounded tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-slate-500"
						/>
					</div>
					<v-btn type="submit">Confirm</v-btn>
				</form>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.inactive {
		opacity: 0.5;
	}
</style>
