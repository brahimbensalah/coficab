import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import IconifyIcon from 'components/base/IconifyIcon';
import { Mentor } from 'data/mentors';

interface MentorCardProps {
  data: Mentor;
}

const MentorCard = ({ data }: MentorCardProps) => {
  return (
    <Card sx={{ userSelect: 'none' }}>
      <Stack alignItems="center" justifyContent="space-between">
        <Stack alignItems="center" spacing={1}>
          <Avatar
            src={data.avatar}
            component={Link}
            href="#!"
            sx={{
              height: 48,
              width: 48,
              bgcolor: 'primary.main',
            }}
          />
          <CardContent>
            <Typography
              component={Link}
              href="#!"
              variant="subtitle1"
              color="text.primary"
              fontWeight={600}
            >
              {data.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {data.title}
            </Typography>
          </CardContent>
        </Stack>
      </Stack>

      <CardContent sx={{ mt: 2.75 }}>
        <Stack alignItems="center" justifyContent="space-between">
          <Stack alignItems="center" spacing={0.875}>
            <IconifyIcon icon="hugeicons:note" color="text.secondary" fontSize="h4.fontSize" />
            <Typography color="text.primary" fontSize="body2.fontSize" fontWeight={600}>
              {data.task} COPY
            </Typography>
          </Stack>
         
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
