import Reactotron from "reactotron-react-js"
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({
  name: 'Vidyaranyam',
  host: '192.168.31.188',
})
  .use(reactotronRedux())
  .connect() 