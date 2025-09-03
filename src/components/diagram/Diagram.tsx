import { useSelector } from 'react-redux';
import { Store } from '../../interface';
import Rung from './Rung';
import AddBanner from './AddBanner';
import { Box } from '@mui/material';
import { BG_DIAGRAM } from '../../consts/colors';
import DiagramHelp from './DiagramHelp';

interface Props {
  mobileUI: boolean;
}

export default function Diagram(props: Props) {
  console.log('Diagram component rendered');
  const mobileUI = props.mobileUI;
  const runglist = useSelector((state: Store) => state.runglist);
  const displayDiagramHelp = runglist.length === 1;

  return (
    <div className="diagram-container">
      <Box p="0.25em">
        {runglist.map((uuid: string, index) => (
          <Rung key={`rung-${uuid}`} index={index} uuid={uuid} mobileUI={mobileUI} />
        ))}
      </Box>
      {displayDiagramHelp && <DiagramHelp />}
      <AddBanner />
    </div>
  );
}
