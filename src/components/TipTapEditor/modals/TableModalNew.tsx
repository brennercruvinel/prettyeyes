import { useState } from 'react';
import { Modal, NumberInput, Button, Group, Stack, Text, Box } from '@mantine/core';
import { FiGrid } from 'react-icons/fi';
import { modalStyles } from './modalStyles';

interface TableModalProps {
  opened: boolean;
  onClose: () => void;
  onInsert: (rows: number, cols: number) => void;
}

export default function TableModal({ opened, onClose, onInsert }: TableModalProps) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInsert(rows, cols);
    handleClose();
  };

  const handleClose = () => {
    setRows(3);
    setCols(3);
    setHoveredCell(null);
    onClose();
  };

  const handleGridHover = (row: number, col: number) => {
    setHoveredCell({ row, col });
    setRows(row + 1);
    setCols(col + 1);
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="xs">
          <FiGrid size={20} />
          <Text>Insert Table</Text>
        </Group>
      }
      {...modalStyles.modal.defaultProps}
      styles={modalStyles.modal.styles}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          {/* Interactive Grid Selector */}
          <Box>
            <Text size="sm" mb="xs" c="dimmed">
              Select table size by hovering
            </Text>
            <Box
              style={{
                display: 'inline-block',
                padding: '8px',
                backgroundColor: '#0d1117',
                borderRadius: '4px',
                border: '1px solid #30363d',
              }}
              onMouseLeave={() => setHoveredCell(null)}
            >
              <Box
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(10, 1fr)',
                  gap: '3px',
                }}
              >
                {Array.from({ length: 10 }, (_, row) =>
                  Array.from({ length: 10 }, (_, col) => (
                    <Box
                      key={`${row}-${col}`}
                      onMouseEnter={() => handleGridHover(row, col)}
                      onClick={() => {
                        setRows(row + 1);
                        setCols(col + 1);
                        handleSubmit(new Event('submit') as any);
                      }}
                      style={{
                        width: '26px',
                        height: '26px',
                        backgroundColor:
                          hoveredCell && row <= hoveredCell.row && col <= hoveredCell.col
                            ? '#8b949e'
                            : '#21262d',
                        border: '1px solid',
                        borderColor:
                          hoveredCell && row <= hoveredCell.row && col <= hoveredCell.col
                            ? '#6e7681'
                            : '#30363d',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        transition: 'all 0.1s ease',
                      }}
                    />
                  ))
                )}
              </Box>
            </Box>
            <Text size="xs" ta="center" mt="xs" c="dimmed">
              {rows} × {cols}
            </Text>
          </Box>

          {/* Manual Input */}
          <Group grow>
            <NumberInput
              label="Rows"
              value={rows}
              onChange={(value) => setRows(typeof value === 'number' ? value : 3)}
              min={1}
              max={20}
              styles={{
                input: modalStyles.input,
                label: modalStyles.label,
              }}
            />
            <NumberInput
              label="Columns"
              value={cols}
              onChange={(value) => setCols(typeof value === 'number' ? value : 3)}
              min={1}
              max={20}
              styles={{
                input: modalStyles.input,
                label: modalStyles.label,
              }}
            />
          </Group>

          {/* Preview */}
          <Box>
            <Text size="sm" mb="xs" c="dimmed">
              Preview
            </Text>
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(cols, 5)}, 1fr)`,
                gap: '2px',
                padding: '8px',
                backgroundColor: '#0d1117',
                borderRadius: '4px',
                border: '1px solid #30363d',
                maxWidth: '200px',
              }}
            >
              {Array.from({ length: Math.min(rows * cols, 25) }, (_, i) => (
                <Box
                  key={i}
                  style={{
                    width: '100%',
                    height: '20px',
                    backgroundColor: '#161b22',
                    borderRadius: '2px',
                    border: '1px solid #30363d',
                  }}
                />
              ))}
            </Box>
            {(rows > 5 || cols > 5) && (
              <Text size="xs" c="dimmed" mt={4}>
                Showing {Math.min(rows, 5)} × {Math.min(cols, 5)} preview
              </Text>
            )}
          </Box>

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
              styles={{ root: modalStyles.button.primary }}
            >
              Insert Table
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}