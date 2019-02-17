!(function (window) {
    const { echarts } = window;
    const ofilmContainer = document.getElementById('ofilm');
    const ofilmChart = echarts.init(ofilmContainer);

    const option = {
        title: {
            text: '欧菲科技',
        },
        tooltip: {},
        legend: {
            data: ['欧菲科技'],
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
                    max: window.CONFIG.MAX_SCORE,
                },
                {
                    name: '营运能力',
                    max: window.CONFIG.MAX_SCORE,
                },
                {
                    name: '盈利能力',
                    max: window.CONFIG.MAX_SCORE,
                },
                {
                    name: '成长性分析',
                    max: window.CONFIG.MAX_SCORE,
                },
                {
                    name: '市现金流量分析',
                    max: window.CONFIG.MAX_SCORE,
                },
            ],
        },
        series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [{
                value: Array.from({ length: 5 }).map(ele => window.CONFIG.OFILM_SCORE),
                name: '欧菲科技',
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
            },

            ],
        }],
    };

    ofilmChart.setOption(option);
}(window));
