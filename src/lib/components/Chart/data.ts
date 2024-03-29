const datasets = [
	{
		label: '2023 Energy Usage',
		data: [128, 121, 126, 111, 129, 128, 111, 119, 117, 129, 113, 128],
		fill: false,
		borderColor: '#FACC15',
		tension: 0.05,
		pointBackgroundColor: '#FACC15'
	},
	{
		label: '2023 Average Energy Usage',
		data: [124, 114, 110, 111, 121, 128, 110, 125, 118, 129, 110, 130],
		fill: false,
		borderColor: '#20BBED',
		tension: 0.05,
		pointBackgroundColor: '#20BBED'
	},
	{
		label: '2022 Energy Usage',
		data: [119, 120, 114, 121, 128, 125, 130, 118, 111, 124, 129, 110],
		fill: false,
		borderColor: '#FC6A01',
		tension: 0.05,
		pointBackgroundColor: '#FC6A01'
	}
];

export const data = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	datasets
};
