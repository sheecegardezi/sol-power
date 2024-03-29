<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import { mode } from 'mode-watcher';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	import { data } from './data';
	import { mediaQuery } from 'svelte-legos';

	const allData = data.datasets.flatMap((dataset) => dataset.data);
	const max = Math.max(...allData) + 20;
	const _min = Math.min(...allData) - 20;

	const min = _min < 0 ? 0 : _min; // Ensure minimum value is not below 0

	$: chartTextColor = $mode === 'light' ? '#71717A' : '#A1A1AA';
	$: gridLinesColor = $mode === 'light' ? '#BBBBC0' : '#3f3f46';
	$: tooltipBgColor = $mode === 'light' ? '#18181b' : '#3f3f46';

	$: isMobile = mediaQuery('(max-width: 640px)');
</script>

<Line
	class="w-full"
	{data}
	options={{
		responsive: true,
		plugins: {
			tooltip: {
				mode: $isMobile ? 'index' : 'nearest', // index to show multiple points in tooltip
				backgroundColor: tooltipBgColor,
				bodySpacing: 8,
				padding: 16,
				titleMarginBottom: 8,
				displayColors: true,
				boxPadding: 6,
				boxHeight: 14,
				usePointStyle: true
			},
			legend: {
				labels: {
					usePointStyle: false,
					useBorderRadius: true,
					boxWidth: 20,
					boxHeight: 10,
					textAlign: 'center',
					borderRadius: 5,
					color: chartTextColor
				}
			}
		},
		scales: {
			x: {
				border: {
					display: true
				},
				grid: {
					display: true,
					color: gridLinesColor
				},
				ticks: {
					color: chartTextColor
				}
			},
			y: {
				border: {
					display: true,
					dash: [5, 5]
				},
				grid: {
					display: true,
					color: gridLinesColor
				},
				min: min,
				max: max,
				ticks: {
					color: chartTextColor
				}
			}
		},
		elements: {
			point: {
				radius: $isMobile ? 4 : 6
			}
		}
	}}
/>
