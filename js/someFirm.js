!(function (window) {
    const { echarts, _, CONFIG } = window;

    const someFirmContainer = document.getElementById('some-firm');
    const someFirmChart = echarts.init(someFirmContainer);
    const initOption = {
        title: {
            text: '',
        },
        tooltip: {},
        legend: {
            data: [''],
        },
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5],
                },
                formatter: text => {
                    return text.replace(/\S{2}/g, match => `${match}\n`);
                },
            },
            indicator: [
                {
                    name: '偿债能力',
                    max: CONFIG.MAX_SCORE,
                },
                {
                    name: '营运能力',
                    max: CONFIG.MAX_SCORE,
                },
                {
                    name: '盈利能力',
                    max: CONFIG.MAX_SCORE,
                },
                {
                    name: '成长性分析',
                    max: CONFIG.MAX_SCORE,
                },
                {
                    name: '市现金流量分析',
                    max: CONFIG.MAX_SCORE,
                },
            ],
        },
        series: [{
            name: '',
            type: 'radar',
            data: [{
                value: [0, 0, 0, 0, 0],
                name: '',
                label: {
                    normal: {
                        show: true,
                        formatter(params) {
                            return params.value;
                        },
                    },
                },
                areaStyle: {
                    normal: {
                        opacity: 0.6,
                        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                            {
                                color: '#B8D3E4',
                                offset: 0,
                            },
                            {
                                color: '#72ACD1',
                                offset: 1,
                            },
                        ]),
                    },
                },
            }],
        }],
    };
    someFirmChart.setOption(initOption);


    const handleCLick = (event) => {
        const newOption = _.cloneDeep(initOption);
        // 获取所有input
        const allInputs = Array.from(document.querySelectorAll('input'));
        const firmName = allInputs[0].value.trim();

        // 修改名称
        newOption.title.text = firmName;
        newOption.legend.data[0] = firmName;
        newOption.series[0].data[0].name = firmName;

        const numberInputs = allInputs.slice(1);

        // 第一组
        const firstGroup = numberInputs.slice(0, 2);
        const firstGroupReference = [
            CONFIG.reference.currentRatio,
            CONFIG.reference.assetsAndLiabilityRate,
        ];

        const averageScore = firstGroup.map((input, index) => {
            const numberValue = Number.parseFloat(input.value.trim());
            const score = Math.min(numberValue / firstGroupReference[index] * CONFIG.OFILM_SCORE, CONFIG.MAX_SCORE);
            return score;
        }).reduce((f, b) => f + b, 0) / 2;

        newOption.series[0].data[0].value[0] = averageScore;

        // 第二组
        someFirmChart.setOption(newOption);
        event.target.style.backgroundColor = 'yellow';
    };

    const submitBtn = document.querySelector('div.my-submit-btn');
    submitBtn.addEventListener('click', handleCLick);
}(window));
