/**
There is an array, each item has such format:
{firstName: 'xxx', lastName: 'xxx', customerID: 'xxx', note: 'xxx',
profession: ‘xxx’}
lastName, note can be empty, customerID can only be a set of digital
numbers.
profession can only have ‘student’, ‘freelancer’, ‘productOwner’,
‘engineer’ or ‘systemAnalytics’.
**/

const testData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    customerID: '12345',
    note: 'VIP customer',
    profession: 'engineer',
  },
  {
    firstName: 'Jane',
    lastName: '',
    customerID: '67890',
    note: '',
    profession: 'student',
  },
  {
    firstName: 'Alice',
    lastName: 'Smith',
    customerID: '54321',
    note: 'New client',
    profession: 'freelancer',
  },
  {
    firstName: 'Bob',
    lastName: 'Brown',
    customerID: '98765',
    note: 'Frequent buyer',
    profession: 'productOwner',
  },
  {
    firstName: 'Charlie',
    lastName: '',
    customerID: '11223',
    note: '',
    profession: 'systemAnalytics',
  },
];

/**
Q1. Please follow the principle (‘firstName’ + ‘lastName’ + ‘customerID’)
to sort this array and print it out.
**/
function sortUserName(user) {
  user.sort((a, b) => {
    return a.firstName + a.lastName + a.customerID >
      b.firstName + b.lastName + b.customerID
      ? 1
      : -1;
  });
  return user;
}

/**
Q2. Please sort by ‘profession’ to follow the principle.
(‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ >
‘student’’)
**/
function sortByType(user) {
  const professionOrder = [
    'systemAnalytics',
    'engineer',
    'productOwner',
    'freelancer',
    'student',
  ];
  user.sort((a, b) => {
    return (
      professionOrder.indexOf(a.profession) -
      professionOrder.indexOf(b.profession)
    );
  });
  return user;
}

/**
Q3. Please write down a function is used to create an array of unique values.
Example:
let items = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1,
3, 2, 6, 7, 5, 4, 4, 7, 8, 8, 0, 1, 2, 3, 1];
output: [1, 5, 2, 3, 4, 7, 8, 9, 0, 6]
**/
const items = [
  1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5, 4,
  4, 7, 8, 8, 0, 1, 2, 3, 1,
];
function getUniqueNumber(items) {
  let result = [];
  items.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });

  return result;
}

// Q4.
/** Can you explain about Interface and Enum, and where will you be using,
please make some examples. **/

Interface 是一種規範，定義類別應具備的方法或屬性，讓實作的類別遵守。
例如，當多個類別需要實現相同功能時，介面能確保一致性。

// 定義介面
interface Shape {
  getArea(): number; // 必須實作的方法
}

// 實作介面的類別
class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  getArea(): number {
    return this.width * this.height;
  }
}

class Circle implements Shape {
  constructor(private radius: number) {}

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

// 使用介面
const shapes: Shape[] = [
  new Rectangle(10, 20),
  new Circle(5)
];

shapes.forEach(shape => console.log(`面積: ${shape.getArea()}`));

Enum 用來定義一組有意義的常數，方便管理與使用。
例如，表示「使用者角色」或「狀態」的情境中常用。

// 定義列舉
enum UserRole {
  Admin = 'Admin',
  Editor = 'Editor',
  Viewer = 'Viewer'
}

// 使用列舉
function getPermissions(role: UserRole): string[] {
  switch (role) {
    case UserRole.Admin:
      return ['新增', '編輯', '刪除', '查看'];
    case UserRole.Editor:
      return ['編輯', '查看'];
    case UserRole.Viewer:
      return ['查看'];
    default:
      return [];
  }
}

console.log(getPermissions(UserRole.Admin)); // ['新增', '編輯', '刪除', '查看']
console.log(getPermissions(UserRole.Viewer)); // ['查看']


// Q5.
/** Can you explain the problem with the following code, and how to fix
it. **/

React 的狀態更新是批次處理的：
React 為了效能，會將多次 setState 合併，並在重新渲染時一次更新。
如果直接使用 this.state.count，每次 setState 使用的值都是同一個，導致無法正確累加。
使用函數式更新可以避免這個問題：

函數式的 setState 確保每次更新基於前一次更新後的最新狀態 (prevState)。
React 保證 prevState 是正確的最新值，因此計算不會出錯。
結果： 修正後，每次 setState 都正確計算基於最新的 count，按預期累加 3。
效能更高，並避免多次 rerender

class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleAddCount = this.handleAddCount.bind(this);
  }
  handleAddCount() {
    this.setState((prevState) => ({ count: prevState.count + 3 }));
  }
  render() {
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={this.handleAddCount}>Add</button>
      </div>
    );
  }
}
ReactDOM.render(<Count />, document.getElementById('root'));

// Q6.
/** Please write the sample code to debounce handleOnChange (Do not use
any 3th party libs other than react) **/
const SearchBox = () => {
  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  handleOnChange = debounce((event) => {
    // make ajax call
  }, 300);

  return <input type="search" name="p" onChange={handleOnChange} />;
};
