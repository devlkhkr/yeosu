<template>
  <table class="ref_tb">
    <tbody>
      <tr>
        <th>
          <span class="text-caption text-blue-grey-7">Frontend</span>
        </th>
        <td>
          <a>
            <q-badge outline color="primary" label="Quasar Framework" />
          </a>
        </td>
      </tr>
      <tr>
        <th>
          <span class="text-caption text-blue-grey-7">Backend</span>
        </th>
        <td>
          <a>
            <q-badge outline color="teal" label="SpringBoot" />
          </a>
          <a>
            <q-badge outline color="red-4" label="MyBatis" />
          </a>
        </td>
      </tr>
      <tr>
        <th>
          <span class="text-caption text-blue-grey-7">Developer</span>
        </th>
        <td>
          <a href="https://github.com/devlkhkr" target="_blank">
            <q-badge outline color="blue-grey-7" label="LeeKangHyoung" />
          </a>
          <a href="https://github.com/lsk961215" target="_blank">
            <q-badge outline color="blue-grey-7" label="LeeSangKi" />
          </a>
        </td>
      </tr>
      <tr>
        <th>
          <span class="text-caption text-blue-grey-7">Vendors</span>
        </th>
        <td>
          <div class="text-blue-grey-7">
            Drawer Banner Image :
            <a
              href="https://kr.freepik.com/free-photo/marbled-table-background_4138766.htm#page=4&query=wave&position=20&from_view=search&track=sph&uuid=4af233fa-fbb4-493d-b17a-b0d367742927"
              target="_blank"
              >작가 rawpixel.com</a
            >
            출처 Freepik
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="q-mt-xl concave">
    <span
      >Provide by InnoBL Corp. &#169; 2024 InnoBL. All Rights Reserved.</span
    >
  </div>
</template>

<style lang="scss">
.ref_tb {
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0 8px;
  text-align: left;
  tr {
    th {
      white-space: nowrap;
      padding-right: 8px;
    }
    td {
      font-size: 10px;
      position: relative;
      padding-left: 12px;
      line-height: 24px;
      a + a {
        margin-left: 8px;
      }
      &::before {
        display: inline-block;
        content: '';
        width: 1px;
        height: 12px;
        background-color: #c7d1e1;
        position: absolute;
        left: 0;
        top: 6px;
      }
    }
  }
}
</style>
