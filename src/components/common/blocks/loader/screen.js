import React from 'react';

import { LoaderWrapper, GridBox, Box } from '@digix/gov-ui/components/common/blocks/loader/style';

class ScreenLoader extends React.Component {
  render() {
    return (
      <LoaderWrapper>
        <GridBox>
          <Box col2 loading />
          <Box col2 loading />
          <Box col2 />
          <Box col2 />
          <Box col2 />
          <Box col2 loading />
          <Box col12 />
          <Box col12 loading />
          <Box col12 />
        </GridBox>
        <GridBox card>
          <Box col4>
            <Box col6 loading />
            <Box col6 />
            <Box col12 />
            <Box col3 large loading />
          </Box>
          <Box col4>
            <Box col6 loading />
            <Box col6 />
            <Box col12 />
            <Box col3 large loading />
          </Box>
          <Box col4>
            <Box col6 loading />
            <Box col6 />
            <Box col12 />
            <Box col3 large loading />
          </Box>
        </GridBox>
        <GridBox />
        <GridBox>
          <Box col2 loading style={{ height: '16px' }} />
          <Box col5 />
          <Box col5 />
          <Box col12 />
          <Box col12 />
          <Box col6>
            <Box col2 loading />
            <Box col2 loading />
            <Box col2 loading />
            <Box col2 loading />
            <Box col2 loading />
            <Box col2 loading />
          </Box>
          <Box col6>
            <Box col2 />
            <Box col2 />
            <Box col2 />
            <Box col2 />
            <Box col2 />
            <Box col2 loading />
          </Box>
        </GridBox>
        <GridBox>
          <Box col6 card>
            <Box col8 large loading />
            <Box col4 />
            <Box col12 />
            <Box col12 />
            <Box col10 loading />
            <Box col2 />
            <Box col12 loading />
            <Box col12 loading />
            <Box col10 loading />
            <Box col2 />

            <Box col12 />
            <Box col12 />
            <Box col3 loading />
            <Box col3 />
            <Box col3 />
            <Box col3 />
            <Box col12 />
            <Box col2 loading />
            <Box col2 />
            <Box col2 />
            <Box col2 />
            <Box col2 />
            <Box col2 loading />
          </Box>

          <Box col3 nospace>
            <Box card col12>
              <Box col4 />
              <Box col4 loading />
              <Box col4 />

              <Box col5 />
              <Box col2 loading />
              <Box col5 />
            </Box>
            <Box card col12>
              <Box col4 />
              <Box col4 loading />
              <Box col4 />

              <Box col5 />
              <Box col2 loading />
              <Box col5 />
            </Box>
            <Box card col12>
              <Box col4 />
              <Box col4 loading />
              <Box col4 />

              <Box col5 />
              <Box col2 loading />
              <Box col5 />
            </Box>
          </Box>
          <Box card col3>
            <Box card col12 nospace>
              <Box col12 />
              <Box col4 />
              <Box col4 loading />
              <Box col4 />
            </Box>
            <Box card col12 nospace>
              <Box col12 />
              <Box col3 />
              <Box col6 loading />
              <Box col3 />
            </Box>
            <Box card col12 nospace>
              <Box col12 />
              <Box col4 />
              <Box col4 loading />
              <Box col4 />
            </Box>
          </Box>
        </GridBox>
        <GridBox>
          <Box col6 card>
            <Box col10 large loading />
            <Box col2 />
            <Box col12 />
            <Box col12 />
            <Box col12 loading />
            <Box col12 loading />
            <Box col10 loading />
            <Box col2 />
            <Box col8 loading />
            <Box col4 />
            <Box col12 />
            <Box col12 />
            <Box col3 loading />
            <Box col3 />
            <Box col3 />
            <Box col3 />
            <Box col12 />
            <Box col2 loading />
            <Box col2 />
            <Box col2 />
            <Box col2 />
            <Box col2 />
            <Box col2 loading />
          </Box>

          <Box col3 nospace>
            <Box card col12>
              <Box col4 />
              <Box col4 loading />
              <Box col4 />

              <Box col5 />
              <Box col2 loading />
              <Box col5 />
            </Box>
            <Box card col12>
              <Box col4 />
              <Box col4 loading />
              <Box col4 />

              <Box col5 />
              <Box col2 loading />
              <Box col5 />
            </Box>
            <Box card col12>
              <Box col4 />
              <Box col4 loading />
              <Box col4 />

              <Box col5 />
              <Box col2 loading />
              <Box col5 />
            </Box>
          </Box>
          <Box card col3>
            <Box card col12 nospace>
              <Box col12 />
              <Box col4 />
              <Box col4 loading />
              <Box col4 />
            </Box>
            <Box card col12 nospace>
              <Box col12 />
              <Box col3 />
              <Box col6 loading />
              <Box col3 />
            </Box>
            <Box card col12 nospace>
              <Box col12 />
              <Box col4 />
              <Box col4 loading />
              <Box col4 />
            </Box>
          </Box>
        </GridBox>
      </LoaderWrapper>
    );
  }
}

export default ScreenLoader;
