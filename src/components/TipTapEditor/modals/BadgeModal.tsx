import { useState } from 'react';
import { Modal, TextInput, Button, Group, Stack, Text, Box, SegmentedControl } from '@mantine/core';
import { FiShield } from 'react-icons/fi';
import { modalStyles } from './modalStyles';

interface BadgeModalProps {
  opened: boolean;
  onClose: () => void;
  onInsert: (label: string, message: string, color: string, style?: string) => void;
}

const BADGE_STYLES = [
  { value: 'flat', label: 'Flat' },
  { value: 'flat-square', label: 'Flat Square' },
  { value: 'plastic', label: 'Plastic' },
  { value: 'for-the-badge', label: 'For the Badge' },
];

const PRESET_COLORS = [
  { name: 'Blue', value: '007ec6' },
  { name: 'Green', value: '97ca00' },
  { name: 'Yellow', value: 'dfb317' },
  { name: 'Orange', value: 'fe7d37' },
  { name: 'Red', value: 'e05d44' },
  { name: 'Pink', value: 'ff69b4' },
  { name: 'Purple', value: '9f4ce5' },
  { name: 'Gray', value: '555' },
];

export default function BadgeModal({ opened, onClose, onInsert }: BadgeModalProps) {
  const [label, setLabel] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('007ec6');
  const [style, setStyle] = useState('flat');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (label && message) {
      onInsert(label, message, color, style);
      handleClose();
    }
  };

  const handleClose = () => {
    setLabel('');
    setMessage('');
    setColor('007ec6');
    setStyle('flat');
    onClose();
  };

  const getBadgeUrl = () => {
    const encodedLabel = encodeURIComponent(label || 'label');
    const encodedMessage = encodeURIComponent(message || 'message');
    return `https://img.shields.io/badge/${encodedLabel}-${encodedMessage}-${color}?style=${style}`;
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="xs">
          <FiShield size={20} />
          <Text>Create Badge</Text>
        </Group>
      }
      size="md"
      {...modalStyles.modal.defaultProps}
      styles={modalStyles.modal.styles}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Label (left side)"
            placeholder="build"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
            styles={{
              input: modalStyles.input,
              label: modalStyles.label,
            }}
          />

          <TextInput
            label="Message (right side)"
            placeholder="passing"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            styles={{
              input: modalStyles.input,
              label: modalStyles.label,
            }}
          />

          <div>
            <Text size="sm" mb="xs" fw={500} c="#c9d1d9">
              Color
            </Text>
            <Group mb="xs">
              {PRESET_COLORS.map((preset) => (
                <Box
                  key={preset.value}
                  onClick={() => setColor(preset.value)}
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: `#${preset.value}`,
                    borderRadius: 4,
                    cursor: 'pointer',
                    border: color === preset.value ? '2px solid #58a6ff' : '2px solid transparent',
                    transition: 'all 0.1s ease',
                  }}
                  title={preset.name}
                />
              ))}
            </Group>
            <TextInput
              placeholder="Custom color (hex)"
              value={color}
              onChange={(e) => setColor(e.target.value.replace('#', ''))}
              leftSection="#"
              maxLength={6}
              styles={{
                input: modalStyles.input,
              }}
            />
          </div>

          <div>
            <Text size="sm" mb="xs" fw={500} c="#c9d1d9">
              Style
            </Text>
            <SegmentedControl
              value={style}
              onChange={setStyle}
              data={BADGE_STYLES}
              fullWidth
              styles={{
                root: {
                  backgroundColor: '#0d1117',
                  borderColor: '#30363d',
                },
                label: {
                  color: '#8b949e',
                  '&[data-active]': {
                    color: '#c9d1d9',
                  },
                },
                indicator: {
                  backgroundColor: '#58a6ff',
                },
              }}
            />
          </div>

          {/* Preview */}
          {(label || message) && (
            <Box>
              <Text size="sm" mb="xs" c="dimmed">
                Preview
              </Text>
              <Box
                p="md"
                style={{
                  backgroundColor: '#0d1117',
                  borderRadius: 4,
                  border: '1px solid #30363d',
                  textAlign: 'center',
                }}
              >
                <img
                  src={getBadgeUrl()}
                  alt="Badge preview"
                  style={{ maxHeight: 28 }}
                />
              </Box>
            </Box>
          )}

          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={handleClose}
              styles={{ root: modalStyles.button.default }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!label || !message}
              styles={{ root: modalStyles.button.primary }}
            >
              Insert Badge
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}