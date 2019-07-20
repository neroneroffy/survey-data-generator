/**
 * Author: NERO
 * Date: 2019/4/3 0003
 * Time: 23:29
 *
 */
import { Container } from 'unstated';

class CounterContainer extends Container {
  constructor(initCount) {
    super(...arguments);
    this.state = {count: initCount || 0};
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };
}

export default CounterContainer