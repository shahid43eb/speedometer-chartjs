import React from "react";
import { Doughnut } from "react-chartjs-2";

export default ()=> {
  const plugin={
    id: 'custom_gradient_background_color',
    afterInit: chart => {
      const ctx = chart.chart.ctx;
      const dataset=chart.chart.config.data.datasets[0];
      const gradient = ctx.createLinearGradient(dataset.data[0]*4,dataset.data[0]*5, 1000,0);
      gradient.addColorStop(0, '#04C0FF');
      gradient.addColorStop(0.5, '#26BD16');
      dataset.backgroundColor[0] = gradient;
      dataset.hoverBackgroundColor[0] = gradient;
    }
  }

  const data = {
    labels: ["Green", "Gray"],
    datasets: [
      {
        data: [0,100],
        backgroundColor: ['green','#E7E7E7'],
        hoverBackgroundColor: ['green','#E7E7E7'],
        borderWidth: [0, 0],
      }
    ],
    options: {
      layout: {
        padding: {
          bottom: 25,
          top: 25
        }
      },
      responsive:'true',
      rotation: Math.PI,
      circumference: Math.PI,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      transition: {
        active: {
          animation: {
            duration: 20000
          }
        }
      },
      cutoutPercentage: 60,
      animation: {
        easing:'linear',
        onProgress:(chart)=>{
          const needleValue = chart.chart.config.data.datasets[0].data[0];
          const dataTotal = chart.chart.config.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0
          );
          const angle = Math.PI + ( (chart.currentStep/chart.numSteps)/ dataTotal) * (needleValue) * Math.PI;
          const ctx = chart.chart.ctx;
          const cw = chart.chart.canvas.offsetWidth;
          const ch = chart.chart.canvas.offsetHeight;
          const cx = (cw / 2);
          const cy = (ch - 25);

          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, -10);
          ctx.lineTo(cy, 0);
          ctx.lineTo(0, 10);
          ctx.fillStyle = "black";
          ctx.fill();
          ctx.rotate(-angle);
          ctx.translate(-cx, -cy);
          ctx.beginPath();
          ctx.arc(cx, cy, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      },
    }
  };

  return (
      <div>
        <h2>Sample</h2>
        <Doughnut height="100px" data={data} options={data.options} plugins={[plugin]} />
      </div>
  );
}
