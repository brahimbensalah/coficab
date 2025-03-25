import { tasks } from 'data/tasks';
import TaskCard from './TaskCard';
import SliderWrapper from 'components/common/SliderWrapper';

const UpcomingTask = () => {
  return <SliderWrapper title="Printers" SliderCard={TaskCard} data={tasks} />;
};

export default UpcomingTask;
