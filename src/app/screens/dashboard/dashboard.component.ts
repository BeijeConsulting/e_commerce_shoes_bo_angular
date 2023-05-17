import { Component, OnInit } from '@angular/core';

interface Order {
  id: number;
  transaction: string;
  transaction_date: string;
  payment_status: string;
  status: string;
  total_price: number;
  created_at: string;
  user_id: number;
  address: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  orders: Order[] = [
    {
      id: 170,
      transaction: '342',
      transaction_date: '',
      payment_status: 'Pagamento effettuato',
      status: 'in spedizione',
      total_price: 160.99,
      created_at: '2023-05-15',
      user_id: 88,
      address: 'Italia, Via Proviamo Indirizzo, 2, 98562',
    },
    {
      id: 169,
      transaction: '00256.85841307082893',
      transaction_date: '',
      payment_status: 'paid',
      status: 'completed',
      total_price: 85.99,
      created_at: '2023-05-15',
      user_id: 88,
      address: 'Italia, via dei Martiri, 14, 80053',
    },
    {
      id: 168,
      transaction: '00136.6250786942925',
      transaction_date: '',
      payment_status: 'paid',
      status: 'completed',
      total_price: 489.99,
      created_at: '2023-04-06',
      user_id: 61,
      address: 'Italia, Via Roma, 81142',
    },
    {
      id: 167,
      transaction: '00321.11413605145844',
      transaction_date: '',
      payment_status: 'paid',
      status: 'completed',
      total_price: 220,
      created_at: '2023-04-06',
      user_id: 61,
      address: 'Italia, Via Roma, 81142',
    },
    {
      id: 166,
      transaction: '00755.6532485887298',
      transaction_date: '',
      payment_status: 'paid',
      status: 'completed',
      total_price: 110,
      created_at: '2023-04-06',
      user_id: 43,
      address: 'Italia, Via Roma 53, 59100',
    },
    {
      id: 165,
      transaction: '00474.7598003443359',
      transaction_date: '',
      payment_status: 'paid',
      status: 'completed',
      total_price: 257.96999999999997,
      created_at: '2023-04-06',
      user_id: 61,
      address: 'Italia, Via Roma, 81123',
    },
    {
      id: 164,
      transaction: '005.924991800283053',
      transaction_date: '',
      payment_status: 'paid',
      status: 'completed',
      total_price: 49.99,
      created_at: '2023-04-06',
      user_id: 43,
      address: 'America, Via Luca Rossi, 57, 59100',
    },
    {
      id: 163,
      transaction: '00249.7700236185252',
      transaction_date: '',
      payment_status: 'paid',
      status: 'completed',
      total_price: 722.95,
      created_at: '2023-04-06',
      user_id: 43,
      address: 'America, Via Luca Rossi, 57, 59100',
    },
    {
      id: 159,
      transaction: '0043.259433991075454',
      transaction_date: '',
      payment_status: 'paid',
      status: 'completed',
      total_price: 379.98,
      created_at: '2023-04-06',
      user_id: 43,
      address: 'America, Via Luca Rossi, 57, 59100',
    },
    {
      id: 158,
      transaction: '87684574234',
      transaction_date: '',
      payment_status: 'Pagamento effettuato',
      status: 'SPEDITO SENZA PROBLEMI',
      total_price: 195.99,
      created_at: '2023-04-05',
      user_id: 101,
      address: 'Inghilterra, Via del Business 66, 66666',
    },
    {
      id: 157,
      transaction: '235767457823',
      transaction_date: '',
      payment_status: 'Pagamento effettuato',
      status: 'in spedizione',
      total_price: 243,
      created_at: '2023-04-05',
      user_id: 101,
      address: 'Francia, Via dei Ginepri 40, 12343',
    },
    {
      id: 156,
      transaction: '12345346745747',
      transaction_date: '',
      payment_status: 'Pagamento effettuato',
      status: 'in spedizione',
      total_price: 334.99,
      created_at: '2023-04-05',
      user_id: 88,
      address: 'Italia, via dei Martiri, 14, 80053',
    },
    {
      id: 155,
      transaction: '1234567890',
      transaction_date: '',
      payment_status: 'paid',
      status: 'in spedizione',
      total_price: 185,
      created_at: '2023-04-05',
      user_id: 88,
      address: 'Italia, via dei Martiri, 14, 80053',
    },
  ];

  monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  incomePerMonth: any = [];
  incomePerNation: any = [];
  ordersPerMonth: any = [];

  ngOnInit(): void {
    this.incomePerNation = this.getIncomePerNation();
    this.incomePerMonth = this.getIncomePerMonth();
    this.ordersPerMonth = this.getOrdersPerMonth();
  }

  getIncomePerNation() {
    let nations: any = [];
    let incomes: any = [];
    let result: any = [];
    const data: any = {};
    this.orders.forEach((item) => {
      const nation: string = item.address.split(',')[0];
      if (isNaN(data[nation])) data[nation] = 0;
      data[nation] += item.total_price;
    });
    for (let key in data) {
      nations.push(key);
      incomes.push(data[key]);
    }

    result.push(nations, incomes);
    return result;
  }

  getIncomePerMonth() {
    let incomes: any = [];

    this.orders.forEach((item) => {
      const monthIndex: number = new Date(item.created_at).getMonth();
      if (isNaN(incomes[monthIndex])) incomes[monthIndex] = 0;
      incomes[monthIndex] += item.total_price;
    });

    for (let i = 0; i < 12; i++) {
      if (!incomes[i]) incomes[i] = 0;
    }

    return [this.monthLabels, incomes];
  }

  getOrdersPerMonth() {
    let orders: any = [];

    this.orders.forEach((item) => {
      const monthIndex: number = new Date(item.created_at).getMonth();
      if (isNaN(orders[monthIndex])) orders[monthIndex] = 0;
      orders[monthIndex] += 1;
    });

    for (let i = 0; i < 12; i++) {
      if (!orders[i]) orders[i] = 0;
    }

    return [this.monthLabels, orders];
  }
}
