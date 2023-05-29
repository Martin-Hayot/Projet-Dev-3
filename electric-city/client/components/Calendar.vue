<script setup>
	const selectedDate = ref("");
	const nbrTrack = ref(1);
	const date = new Date();
	const days = ref([]);
	const isActive = ref(false);
	const thisDate = new Date().toISOString().slice(0, 10);
	const currYear = ref(date.getFullYear());
	const currMonth = ref(date.getMonth());
	const thisMonth = ref(date.getMonth());
	const thisYear = ref(date.getFullYear());
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
	const price = ref(85);
	let currentDate = `${months[currMonth.value]} ${currYear.value}`;

	function renderCalendar() {
		let first_day = new Date(currYear.value, currMonth.value, 1).getDay() - 1;
		if (first_day === -1) {
			first_day = 6; // Sunday
		}
		let lastDateOfMonth = new Date(
			currYear.value,
			currMonth.value + 1,
			0
		).getDate();
		let lastDateofLastMonth = new Date(
			currYear.value,
			currMonth.value,
			0
		).getDate();
		let lastDayOfMonth = new Date(
			currYear.value,
			currMonth.value,
			lastDateOfMonth
		).getDay();
		for (let i = first_day; i > 0; i--) {
			days.value.push({
				day: lastDateofLastMonth - i + 1,
				date: new Date(
					currYear.value,
					currMonth.value - 1,
					lastDateofLastMonth - i + 2
				)
					.toISOString()
					.slice(0, 10),
				isInCurrMonth: "prev",
				isToday: false,
				isTaken: false,
			});
		}
		for (let i = 1; i <= lastDateOfMonth; i++) {
			if (
				i == today &&
				currMonth.value == thisMonth.value &&
				currYear.value == thisYear.value
			) {
				days.value.push({
					day: i,
					isInCurrMonth: "curr",
					date: new Date(currYear.value, currMonth.value, i + 1)
						.toISOString()
						.slice(0, 10),
					isToday: true,
					isTaken: false,
				});
				continue;
			}
			days.value.push({
				day: i,
				isInCurrMonth: "curr",
				date: new Date(currYear.value, currMonth.value, i + 1)
					.toISOString()
					.slice(0, 10),
				isToday: false,
				isTaken: false,
			});
		}
		for (let i = lastDayOfMonth; i < 7; i++) {
			days.value.push({
				day: i - lastDayOfMonth + 1,
				date: new Date(
					currYear.value,
					currMonth.value + 1,
					i - lastDayOfMonth + 2
				)
					.toISOString()
					.slice(0, 10),
				isInCurrMonth: "next",
				isToday: false,
				isTaken: false,
			});
		}
		return days.value;
	}
	function NextMonth() {
		if (currMonth.value > 0) {
			currMonth.value--;
			currentDate = `${months[currMonth.value]} ${currYear.value}`;
		} else {
			currMonth.value = 11;
			currYear.value--;
			currentDate = `${months[currMonth.value]} ${currYear.value}`;
		}
		days.value = [];
		days.value = renderCalendar();
		getDates();
	}

	function UpdateDate(date) {
		days.value.forEach((day) => {
			if (day.date == date) {
				day.isTaken = true;
			}
		});
	}

	onBeforeMount(() => {
		days.value = renderCalendar();
		if (process.client) {
			getDates();
		}
	});

	function PreviousMonth() {
		if (currMonth.value < 11) {
			currMonth.value++;
			currentDate = `${months[currMonth.value]} ${currYear.value}`;
		} else {
			currMonth.value = 0;
			currYear.value++;
			currentDate = `${months[currMonth.value]} ${currYear.value}`;
		}
		days.value = [];
		days.value = renderCalendar();
		getDates();
	}
	const SelectDate = (day, month, year, isInCurrMonth) => {
		if (isInCurrMonth == "prev")
			selectedDate.value = new Date(year, month - 1, day + 1)
				.toISOString()
				.slice(0, 10);
		else if (isInCurrMonth == "curr")
			selectedDate.value = new Date(year, month, day + 1)
				.toISOString()
				.slice(0, 10);
		else if (isInCurrMonth == "next")
			selectedDate.value = new Date(year, month + 1, day + 1)
				.toISOString()
				.slice(0, 10);
	};
	const takeDate = (e) => {
		console.log(e.target.nbrTracks.value);
		$fetch("http://localhost:3001/api/agenda/appointments", {
			method: "POST",
			body: JSON.stringify({
				date: selectedDate.value,
				nbrTrack: e.target.nbrTracks.value,
				description: e.target.description.value,
				accessToken: localStorage.getItem("accessToken"),
			}),
		}).then((res) => {
			if (res.status == "success") {
				alert("Appointment taken");
				UpdateDate(selectedDate.value);
			}
		});
	};
	const getDates = () => {
		$fetch("http://localhost:3001/api/agenda/appointments/all", {
			method: "GET",
		}).then((res) => {
			if (res.status == "success") {
				for (let day of res.data) {
					UpdateDate(day.date);
				}
			}
		});
	};
</script>

<template>
	<div class="text-left tw-text-6xl tw-m-10">
		<Icon
			name="ic:sharp-arrow-back"
			@click="navigateTo('/user/appointments')"
		/>
		New appointment
	</div>
	<div class="text-center tw-text-5xl tw-m-5 tw-mt-44">
		<h1>Pick a date for an appointment</h1>
	</div>
	<div
		class="tw-flex tw-items-center tw-justify-center tw-gap-8 tw-py-8 tw-px-4 tw-ml-5"
	>
		<div class="tw-max-w-2xl tw-w-full tw-shadow-lg">
			<div
				class="md:tw-p-6 tw-p-4 dark:tw-bg-gray-800 tw-bg-white tw-rounded-t"
			>
				<div
					class="tw-px-4 tw-py-2 tw-mt-2 tw-flex tw-items-center tw-justify-between"
				>
					<span
						tabindex="0"
						class="focus:tw-outline-none tw-text-4xl tw-font-bold dark:tw-text-gray-100 tw-text-gray-800"
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
				<div class="tw-pt-10 tw-pb-6 tw-text-2xl tw-overflow-x-auto">
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
								class="tw-text-xl tw-font-medium tw-text-center tw-text-gray-800 dark:tw-text-gray-100 tw-py-6"
								:class="{
									inactive:
										day.isInCurrMonth == 'prev' ||
										day.isInCurrMonth == 'next' ||
										day.isTaken ||
										day.date < thisDate,
									'hover:tw-rounded-full hover:tw-bg-slate-900 tw-cursor-pointer':
										day.isInCurrMonth == 'curr' &&
										!day.isTaken &&
										day.date >= thisDate,
									'tw-bg-blue-500': day.isToday,
									'tw-rounded-full': day.isToday,
								}"
								@click="
									if (
										day.isInCurrMonth == 'curr' &&
										!day.isTaken &&
										day.date >= thisDate
									) {
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
				<form @submit.prevent="takeDate">
					<p class="tw-text-3xl tw-bg-slate-600 tw-text-center tw-rounded-lg">
						{{ selectedDate }}
					</p>
					<div class="tw-flex-row tw-flex align-center tw-gap-5">
						<div class="tw-flex tw-flex-col tw-my-2 tw-mb-6">
							<label for="nbrTrack">Number of tracks</label>
							<input
								type="number"
								name="nbrTracks"
								max="3"
								min="1"
								required
								v-model="nbrTrack"
								class="tw-bg-slate-100 tw-w-32 tw-py-2 tw-px-4 tw-text-gray-700 tw-border tw-border-gray-300 tw-rounded tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-slate-500"
							/>
						</div>
						<p class="tw-text-2xl tw-mt-2">{{ price * nbrTrack }} €</p>
					</div>
					<textarea
						name="description"
						id=""
						cols="30"
						rows="6"
						placeholder="Add a comment"
						class="tw-bg-white tw-rounded-md tw-shadow-sm tw-border tw-border-gray-300 tw-p-2 tw-mb-4 tw-w-full tw-text-gray-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-slate-500"
					></textarea>
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
