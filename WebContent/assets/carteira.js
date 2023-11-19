function formatarNumero(numero) {
  // Converte o número para uma string
  let numeroString = numero.toString();

  // Separa a parte inteira da parte decimal
  let partes = numeroString.split(".");

  // Formata a parte inteira adicionando separadores de milhares
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Se houver parte decimal, formata-a com duas casas decimais
  if (partes[1]) {
    partes[1] = partes[1].padEnd(2, "0");
  } else {
    partes[1] = "00";
  }

  // Junta as partes e retorna o resultado
  return partes.join(",");
}

// Valores retornados do back end
const saldoDebito = 10000;
const saldoCredito = 3000;
const investimentos = 15000;

const saldoTotal = saldoDebito + saldoCredito + investimentos;

const liSaldoDebito = document.getElementById("saldoDebito");
const liSaldoCredito = document.getElementById("saldoCredito");
const liSaldoInvestimento = document.getElementById("investimentos");
const liSaldoTotal = document.getElementById("saldoTotal");

liSaldoDebito.innerText = `R$ ${formatarNumero(saldoDebito)}`;
liSaldoCredito.innerText = `R$ ${formatarNumero(saldoCredito)}`;
liSaldoInvestimento.innerText = `R$ ${formatarNumero(investimentos)}`;
liSaldoTotal.innerText = `R$ ${formatarNumero(saldoTotal)}`;

const listaSaldos = [];
listaSaldos.push(saldoDebito);
listaSaldos.push(saldoCredito);
listaSaldos.push(investimentos);

var options = {
  chart: {
    type: "donut",
    animations: {
      enabled: true,

      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },

  series: listaSaldos,
  labels: ["Saldo Débito", "Saldo Crédito", "Investimento"],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: false,
            show: true,
            formatter: function (w) {
              const operacao = w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);

              return `R$ ${operacao}`;
            },
          },
        },
        size: "90%",
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return "";
    },
  },
  colors: ["#022340", "#03989E", "#91D2D9"],
  legend: {
    show: false, // Remove this line to display the legend again
  },
  yaxis: {
    decimalsInFloat: 2,
    labels: {
      formatter: function (value) {
        return parseFloat(value).toFixed(1);
      },
    },
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
